// ✅ API Route — app/api/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // ✅ Assure que le Content-Type est JSON
    if (req.headers.get('content-type') !== 'application/json') {
      return NextResponse.json({ error: 'Content-Type invalide' }, { status: 400 });
    }

    const body = await req.json();
    const annonceId = parseInt(body.annonceId);

    if (!annonceId || isNaN(annonceId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    // Vérifie si le like existe déjà
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_annonceId: {
          userId: session.user.id,
          annonceId: annonceId,
        },
      },
    });

    if (existingLike) {
      // Supprimer le like (toggle off)
      await prisma.like.delete({
        where: {
          userId_annonceId: {
            userId: session.user.id,
            annonceId: annonceId,
          },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Créer le like (toggle on)
      await prisma.like.create({
        data: {
          userId: session.user.id,
          annonceId: annonceId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Erreur dans /api/like :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
