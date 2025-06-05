import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const otherUserId = parseInt(params.id);
  if (isNaN(otherUserId)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  const otherUser = await prisma.user.findUnique({
    where: { id: otherUserId },
    select: {
      id: true,
      prenom: true,
      nom: true,
    },
  });

  if (!otherUser) {
    return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
  }

  return NextResponse.json({
    ...otherUser,
    lastMessage: '',
    lastDate: '',
  });
}
