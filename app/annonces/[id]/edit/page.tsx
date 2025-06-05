import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditForm from './EditForm';

export default async function EditAnnoncePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/connexion');

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });

  if (!annonce || annonce.author.email !== session.user.email) {
    redirect('/annonces');
  }

  return <EditForm annonce={annonce} />;
}
