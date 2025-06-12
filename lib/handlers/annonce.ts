import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

type UpdateAnnonceData = {
  title: string
  description: string
  ville: string
  price: string | number
  rooms: string | number
  surface: string | number
  type: string
}

export async function handleUpdateAnnonce(id: string, body: UpdateAnnonceData): Promise<Response> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new Response('Non autorisé', { status: 401 })
  }

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  })

  if (!annonce || annonce.author.email !== session.user.email) {
    return new Response('Interdit', { status: 403 })
  }

  if (
    !body.title ||
    !body.description ||
    !body.ville ||
    isNaN(Number(body.price)) ||
    isNaN(Number(body.rooms)) ||
    isNaN(Number(body.surface)) ||
    !body.type
  ) {
    return new Response('Données invalides', { status: 400 })
  }

  await prisma.annonce.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description,
      ville: body.ville,
      price: parseFloat(String(body.price)),
      type: body.type,
      rooms: parseInt(String(body.rooms)),
      surface: parseInt(String(body.surface)),
    },
  })

  return new Response('OK')
}
