import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LikesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ backgroundColor: '#F7E5E1' }}>
        <p className="text-lg text-[#3D3D3D]">Veuillez vous connecter pour voir vos annonces.</p>
      </div>
    );
  }

  const isProprietaire = session.user.role === 'PROPRIETAIRE';

  const annonces = isProprietaire
    ? await prisma.annonce.findMany({
        where: { authorId: Number(session.user.id) },
        orderBy: { createdAt: 'desc' },
      })
    : await prisma.like.findMany({
        where: { userId: Number(session.user.id) },
        include: { annonce: true },
        orderBy: { createdAt: 'desc' },
      });

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: '#F7E5E1' }}>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-[#3D3D3D]">
        <Heart className="w-6 h-6 text-red-500" />
        {isProprietaire ? 'Mes annonces publiées' : 'Mes annonces likées'}
      </h1>

      {annonces.length === 0 ? (
        <p className="text-gray-600 text-sm">
          {isProprietaire
            ? 'Vous n’avez encore publié aucune annonce.'
            : 'Vous n’avez encore liké aucune annonce.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isProprietaire ? annonces : annonces.map((like) => like.annonce)).map((ann) => (
            <div
              key={ann.id}
              className="border border-[#171717] rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
            >
              {Array.isArray(ann.images) && ann.images.length > 0 && typeof ann.images[0] === 'string' && (
                <Link href={`/annonces/${ann.id}`} className="block">
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={ann.images[0]}
                      alt={`Image principale de ${ann.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                </Link>
              )}

              <div className="p-4 flex flex-col gap-2 flex-grow">
                <span className="text-xs font-medium text-[#3D3D3D] uppercase">Vente</span>
                <h2 className="text-lg font-bold text-[#3D3D3D]">{ann.title}</h2>

                <p className="text-sm text-[#3D3D3D]">
                  {ann.rooms} pièces • {ann.surface} m²
                </p>

                <p className="text-sm text-[#3D3D3D]">
                  {ann.description.length > 150 ? ann.description.slice(0, 150) + '…' : ann.description}
                </p>
              </div>

              <div className="flex justify-between items-center px-4 pb-4 mt-auto">
                <span className="text-base font-semibold text-[#405733]">
                  {ann.price.toLocaleString()} €
                </span>
                <Link
                  href={`/annonces/${ann.id}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Voir <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
