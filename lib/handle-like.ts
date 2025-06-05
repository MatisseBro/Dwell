import { prisma } from '@/lib/prisma';
import { getSessionSafe } from '@/lib/get-session';

export async function handleLike(annonceId: string): Promise<Response> {
  const session = await getSessionSafe();

  if (!session?.user?.id) {
    return new Response('Non autorisé', { status: 401 });
  }

  await prisma.like.create({
    data: {
      userId: session.user.id,
      annonceId: parseInt(annonceId),
    },
  });

  return new Response('OK', { status: 200 });
}
