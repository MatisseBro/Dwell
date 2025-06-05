import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return NextResponse.json([], { status: 401 });

  const currentUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!currentUser) return NextResponse.json([], { status: 401 });

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUser.id },
        { receiverId: currentUser.id },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: { sender: true, receiver: true },
  });

  const map = new Map<number, {
    id: number;
    prenom: string;
    nom: string;
    lastMessage: string;
    lastDate: string;
  }>();

  for (const msg of messages) {
    const otherUser = msg.senderId === currentUser.id ? msg.receiver : msg.sender;

    if (!map.has(otherUser.id)) {
      map.set(otherUser.id, {
        id: otherUser.id,
        prenom: otherUser.prenom,
        nom: otherUser.nom,
        lastMessage: msg.content,
        lastDate: msg.createdAt.toISOString(),
      });
    }
  }

  return NextResponse.json(Array.from(map.values()));
}
