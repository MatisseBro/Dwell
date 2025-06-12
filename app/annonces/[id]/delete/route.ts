// app/annonces/[id]/delete/route.ts

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// PAS de type custom ici. Typage direct en inline.
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!context.params?.id) {
    return new NextResponse('Paramètre manquant', { status: 400 });
  }

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(context.params.id) },
    include: { author: true },
  });

  if (!session?.user?.email || annonce?.author.email !== session.user.email) {
    return new NextResponse('Non autorisé', { status: 403 });
  }

  await prisma.annonce.delete({
    where: { id: Number(context.params.id) },
  });

  return NextResponse.redirect(new URL('/annonces', req.url));
}
