// app/annonces/[id]/delete/route.ts
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(
  _req: NextRequest,
  context: RouteContext
) {
  const session = await getServerSession(authOptions);

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

  return NextResponse.redirect(new URL('/annonces', _req.url));
}
