import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AnnonceDetailClient from '@/components/AnnonceDetailClient';

export default async function AnnonceDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const annonce = await prisma.annonce.findUnique({
    where: { id: Number(params.id) },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          nom: true,
          prenom: true,
          telephone: true,
        },
      },
    },
  });

  if (!annonce) return notFound();

  const isAuthor = session?.user?.email === annonce.author.email;

  const safeAnnonce = {
    ...annonce,
    images: Array.isArray(annonce.images)
      ? annonce.images.filter((img): img is string => typeof img === 'string')
      : [],
    isAuthor,
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 lg:px-20 bg-[#F7E5E1]">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/annonces">
          <Button
            className="mb-6 border border-black text-black bg-transparent group hover:bg-transparent"
          >
            <ArrowLeft
              className="mr-2 h-4 w-4 transition-colors"
              style={{ color: 'inherit' }}
            />
            <span className="transition-colors group-hover:text-[#405733] group-hover:[&>svg]:text-[#405733]">
              Retour aux annonces
            </span>
          </Button>
        </Link>

        <div className="p-6 rounded-lg border border-black text-black">
          <AnnonceDetailClient annonce={safeAnnonce} />
        </div>
      </div>
    </div>
  );
}
