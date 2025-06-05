'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function handleCreateAnnonce(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error('Non autorisé')
  }

  const userId = session.user.id

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const ville = formData.get('ville') as string
  const price = parseFloat(formData.get('price') as string)
  const type = formData.get('type') as string
  const rooms = parseInt(formData.get('rooms') as string)
  const surface = parseInt(formData.get('surface') as string)
  const files = formData.getAll('images') as File[]

  const uploadedUrls: string[] = []

  for (const file of files.slice(0, 5)) {
    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const base64 = buffer.toString('base64')
      const dataUrl = `data:${file.type};base64,${base64}`
      uploadedUrls.push(dataUrl)
    }
  }

  await prisma.annonce.create({
    data: {
      title,
      description,
      ville,
      price,
      type,
      rooms,
      surface,
      images: uploadedUrls,
      authorId: userId,
    },
  })

  revalidatePath('/annonces')
  redirect('/annonces')
}
