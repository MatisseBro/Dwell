import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'PROPRIETAIRE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const title = formData.get('title')?.toString() || ''
    const description = formData.get('description')?.toString() || ''
    const ville = formData.get('ville')?.toString() || ''
    const price = parseFloat(formData.get('price') as string)
    const type = formData.get('type')?.toString() || ''
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
        authorId: session.user.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erreur API création annonce :', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
