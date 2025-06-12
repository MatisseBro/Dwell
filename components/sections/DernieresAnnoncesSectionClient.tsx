'use client';

import useSWR from 'swr';
import Link from 'next/link';
import type { Annonce } from '@/types/annonce';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  // Debug : afficher dans la console ce qui est renvoyé
  console.log('Données reçues depuis /api/annonces/last :', data);

  // Si la réponse est un objet { annonces: [...] }, retourne data.annonces
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.annonces)) return data.annonces;

  // Sinon, retourne tableau vide pour éviter le crash
  return [];
};

export default function DernieresAnnoncesSectionClient() {
  const { data: annonces, error, isLoading } = useSWR<Annonce[]>('/api/annonces/last', fetcher);

  if (isLoading) {
    return <p className="text-center text-muted">Chargement des annonces...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Erreur de chargement des annonces.</p>;
  }

  if (!Array.isArray(annonces) || annonces.length === 0) {
    return <p className="text-center text-muted">Aucune annonce disponible.</p>;
  }

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-[#353535] text-white">
      <div className="container px-4 md:px-6">
        {/* Titre + sous-titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Découvrez nos dernières annonces
          </h2>
          <p className="text-lg md:text-xl text-[#f3f3f3] max-w-2xl mx-auto">
            Des biens de qualité sélectionnés pour vous dans toute la France.
          </p>
        </div>

        {/* Grille d’annonces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-12">
          {annonces.map((annonce) => (
            <PropertyCard
              key={annonce.id}
              annonceId={annonce.id}
              title={annonce.title}
              location={annonce.ville}
              price={`${annonce.price.toLocaleString()}€/mois`}
              type={annonce.type}
              surface={`${annonce.surface}m²`}
              rooms={`${annonce.rooms} pièce${annonce.rooms > 1 ? 's' : ''}`}
              imageUrl={
                Array.isArray(annonce.images) && typeof annonce.images[0] === 'string'
                  ? annonce.images[0]
                  : '/placeholder.svg'
              }
            />
          ))}
        </div>

        {/* Bouton "Voir toutes les annonces" */}
        <div className="flex justify-center">
          <Link href="/annonces">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-white hover:bg-primary/10"
            >
              Voir toutes les annonces
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
