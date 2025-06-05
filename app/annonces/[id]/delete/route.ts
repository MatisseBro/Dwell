// app/annonces/[id]/delete/route.ts
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });

  if (!session || session.user.email !== annonce?.author.email) {
    return new Response('Non autorisé', { status: 403 });
  }

  await prisma.annonce.delete({
    where: { id: Number(params.id) },
  });

  redirect('/annonces');
}
