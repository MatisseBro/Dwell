// lib/update-annonce.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function updateAnnonceHandler(params: { id: string }, body: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response('Non autorisé', { status: 401 });
  }

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });

  if (!annonce || annonce.author.email !== session.user.email) {
    return new Response('Interdit', { status: 403 });
  }

  if (
    !body.title ||
    !body.description ||
    !body.ville ||
    isNaN(parseFloat(body.price)) ||
    isNaN(parseInt(body.rooms)) ||
    isNaN(parseInt(body.surface)) ||
    !body.type
  ) {
    return new Response('Données invalides', { status: 400 });
  }

  await prisma.annonce.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      description: body.description,
      ville: body.ville,
      price: parseFloat(body.price),
      type: body.type,
      rooms: parseInt(body.rooms),
      surface: parseInt(body.surface),
    },
  });

  return new Response('OK');
}
