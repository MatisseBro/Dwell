import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  if (!currentUser) {
    return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 401 });
  }

  const otherUserId = parseInt(params.userId);
  if (isNaN(otherUserId)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUser.id, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUser.id },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}
