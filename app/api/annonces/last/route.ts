import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const annonces = await prisma.annonce.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        ville: true,
        price: true,
        type: true,
        surface: true,
        rooms: true,
        images: true,
      },
    });

    console.log('[API] Annonces retournées :', annonces); // ✅ log pour debug

    return NextResponse.json(annonces);
  } catch (error) {
    console.error('[API] Erreur récupération annonces :', error); // ✅ log en cas d’échec
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
