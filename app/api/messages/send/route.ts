import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await req.json();
    const { content, receiverId } = body;

    if (!content || !receiverId) {
      return NextResponse.json({ error: 'Message ou destinataire manquant' }, { status: 400 });
    }

    const sender = await prisma.user.findUnique({
      where: { email: user.email! },
    });

    if (!sender) {
      return NextResponse.json({ error: 'Expéditeur introuvable' }, { status: 404 });
    }

    const receiver = await prisma.user.findUnique({
      where: { id: Number(receiverId) },
    });

    if (!receiver) {
      return NextResponse.json({ error: 'Destinataire introuvable' }, { status: 404 });
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('❌ Erreur envoi message :', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
