import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowRight, Plus } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { Button } from '@/components/ui/button';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';
const PAGE_SIZE = 9;

export default async function AnnoncesPage({
  searchParams,
}: {
  searchParams?: {
    ville?: string;
    type?: string;
    rooms?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const isLocataire = session?.user?.role === 'LOCATAIRE';

  const filters: Prisma.AnnonceWhereInput = {};

  if (searchParams?.ville) {
    filters.ville = {
      contains: searchParams.ville.toLowerCase(),
    };
  }

  if (searchParams?.type && searchParams.type !== 'all') {
    filters.type = searchParams.type;
  }

  if (searchParams?.rooms && searchParams.rooms !== 'all') {
    filters.rooms =
      searchParams.rooms === '4'
        ? { gte: 4 }
        : parseInt(searchParams.rooms);
  }

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    filters.price = {};
    if (searchParams.minPrice) {
      filters.price.gte = parseFloat(searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      filters.price.lte = parseFloat(searchParams.maxPrice);
    }
  }

  const page = parseInt(searchParams?.page || '1', 10);
  const skip = (page - 1) * PAGE_SIZE;

  const [annonces, total] = await Promise.all([
    prisma.annonce.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      include: { likedBy: true },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.annonce.count({ where: filters }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: '#F7E5E1' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-gray-700">
            <Home className="w-6 h-6 text-primary" />
            <span className="uppercase tracking-wide text-lg font-semibold">
              {total} annonces correspondant à votre recherche.
            </span>
          </div>

          <form method="GET" className="flex gap-2 items-center">
            <input
              type="text"
              name="ville"
              placeholder="Ville"
              defaultValue={searchParams?.ville}
              className="px-3 py-1 border border-black text-black rounded text-sm"
            />
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90 text-sm">
              Rechercher
            </Button>
          </form>
        </div>
      </div>

      {session?.user?.role === 'PROPRIETAIRE' && (
        <div className="mb-6">
          <Link href="/annonces/create">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Publier une annonce
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {annonces.map((ann) => {
          const alreadyLiked = session?.user?.id
            ? ann.likedBy.some((like) => like.userId === session.user.id)
            : false;

          return (
            <div
              key={ann.id}
              className="border border-black rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
              style={{ backgroundColor: 'transparent' }}
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
                <p className="text-sm text-[#3D3D3D]">📍 {ann.ville}</p>
                <p className="text-sm text-[#3D3D3D]">
                  {ann.rooms} pièces • {ann.surface} m² • {(ann.price / ann.surface).toFixed(2)} € / m²
                </p>
                <p className="text-sm text-[#3D3D3D]">
                  {ann.description.length > 150
                    ? ann.description.slice(0, 150) + '…'
                    : ann.description}
                </p>
              </div>

              <div className="flex items-center justify-between px-4 pb-4 mt-auto">
                <span className="text-base font-semibold text-[#405733]">
                  {ann.price.toLocaleString()} €
                </span>
                <div className="flex items-center gap-2">
                  {isLocataire && (
                    <LikeButton annonceId={ann.id} initialLiked={alreadyLiked} />
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
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const currentPage = index + 1;
            const url = new URLSearchParams({ ...searchParams, page: currentPage.toString() }).toString();

            return (
              <Link key={index} href={`/annonces?${url}`}>
                <Button
                  variant={page === currentPage ? 'default' : 'outline'}
                  className="text-sm"
                >
                  {currentPage}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
