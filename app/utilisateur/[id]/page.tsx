import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, UserCircle } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProfilPublicPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    select: {
      prenom: true,
      nom: true,
      email: true,
      role: true,
      annonces: {
        select: {
          id: true,
          title: true,
          price: true,
          surface: true,
          rooms: true,
          description: true,
          images: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-10" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="max-w-6xl mx-auto space-y-10 text-[#1E1E1E]">

        {/* Avatar + Nom */}
        <div className="flex items-center gap-6">
          <div className="p-1 rounded-full border-2 border-[#1E1E1E]">
            <UserCircle className="h-20 w-20 text-[#405733]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Profil de {user.prenom} {user.nom}</h1>
            <p className="text-base">👤 {user.role}</p>
            <p className="text-base">📧 {user.email}</p>
          </div>
        </div>

        {/* Annonces */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b border-[#1E1E1E] pb-2">
            Annonces publiées
          </h2>

          {user.annonces.length === 0 ? (
            <p className="text-base">Aucune annonce disponible.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.annonces.map((ann) => (
                <div
                  key={ann.id}
                  className="border border-[#1E1E1E] rounded-lg hover:shadow-md transition overflow-hidden"
                >
                  {Array.isArray(ann.images) &&
                    ann.images.length > 0 &&
                    typeof ann.images[0] === 'string' && (
                      <div className="relative w-full h-52 overflow-hidden">
                        <Image
                          src={ann.images[0]}
                          alt={`Image de ${ann.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      </div>
                    )}

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{ann.title}</h3>
                    <p className="text-sm text-[#3d3d3d]">
                      {ann.rooms} pièces • {ann.surface} m² • {(ann.price / ann.surface).toFixed(2)} € / m²
                    </p>
                    <p className="text-sm text-[#3d3d3d]">
                      {ann.description.length > 150
                        ? ann.description.slice(0, 150) + '…'
                        : ann.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-[#405733]">
                        {ann.price.toLocaleString()} €
                      </span>
                      <div className="flex items-center gap-2">
                        {session?.user?.role === 'LOCATAIRE' && (
                          <button className="text-red-500 hover:text-red-600">
                            <Heart className="w-5 h-5" />
                          </button>
                        )}
                        <Link
                          href={`/annonces/${ann.id}`}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          Lire la suite <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
