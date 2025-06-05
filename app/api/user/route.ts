// app/api/user/route.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email requis' }), {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      nom: true,
      prenom: true,
      telephone: true,
      role: true,
      createdAt: true,
      likes: {
        select: {
          annonce: {
            select: {
              id: true,
              title: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'Utilisateur introuvable' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
