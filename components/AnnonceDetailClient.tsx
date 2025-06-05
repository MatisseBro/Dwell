'use client';

import { useState } from 'react';
import { UserCircle, Phone, Pencil, Trash2, X, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import AnnonceSwiper from './AnnonceSwiper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  annonce: {
    id: number;
    title: string;
    type: string;
    rooms: number;
    surface: number;
    ville: string;
    price: number;
    description: string;
    images: string[];
    author: {
      id: number;
      prenom: string;
      nom: string;
      telephone?: string | null;
    };
    isAuthor: boolean;
  };
}

function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

export default function AnnonceDetailClient({ annonce }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleContactClick = () => {
    router.push(`/messages?userId=${annonce.author.id}`);
  };

  return (
    <div className="space-y-6 text-black relative">
      {annonce.images.length > 0 && <AnnonceSwiper images={annonce.images} />}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-3xl font-bold text-black">{annonce.title}</h1>
          <p className="text-black">
            {annonce.type} • {annonce.rooms} pièces • {annonce.surface} m²
          </p>
          <p className="text-sm text-black">📍 {annonce.ville}</p>

          <div className="text-xl font-semibold text-[#405733]">
            {annonce.price.toLocaleString()} € / mois
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-black">Description</h2>
            <p className="mt-2 text-black">{annonce.description}</p>
          </div>
        </div>

        <div className="rounded-lg p-4 border border-black text-center flex flex-col items-center text-black">
          <UserCircle className="w-8 h-8 text-[#405733] mb-2" />
          <Link
            href={`/utilisateur/${annonce.author.id}`}
            className="font-medium hover:underline text-black mb-1"
          >
            {annonce.author.prenom} {annonce.author.nom}
          </Link>

          {annonce.author.telephone && (
            <div className="text-sm flex items-center gap-1 mb-3 text-black">
              <Phone className="w-4 h-4" />
              <span>{formatPhone(annonce.author.telephone)}</span>
            </div>
          )}

          {!annonce.isAuthor && (
            <Button
              size="sm"
              onClick={handleContactClick}
              className="bg-[#405733] text-white hover:bg-[#304624] mt-2 w-full"
            >
              Contactez-moi
            </Button>
          )}

          {annonce.isAuthor && (
            <div className="flex flex-col gap-2 mt-4 w-full">
              <Link href={`/annonces/${annonce.id}/edit`}>
                <Button
                  className="w-full border border-black text-black bg-transparent hover:bg-transparent group"
                >
                  <Pencil className="w-4 h-4 mr-2 transition-colors group-hover:text-[#405733]" />
                  <span className="transition-colors group-hover:text-[#405733]">
                    Modifier l’annonce
                  </span>
                </Button>
              </Link>

              <Button
                type="button"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => setShowConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer l’annonce
              </Button>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl text-center space-y-4 border border-gray-200 relative">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
            <h2 className="text-xl font-semibold text-black">
              Êtes-vous sûr de vouloir supprimer l’annonce ?
            </h2>
            <p className="text-sm text-gray-600">
              Cette action est irréversible.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <Button
                className="border border-black text-black bg-transparent hover:bg-transparent"
                onClick={() => setShowConfirm(false)}
              >
                Annuler
              </Button>

              <form action={`/annonces/${annonce.id}/delete`} method="post">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirmer la suppression
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
