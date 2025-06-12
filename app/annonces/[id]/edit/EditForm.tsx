'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AnnonceProps = {
  id: number;
  title: string;
  description: string;
  ville: string;
  price: number;
  type: string;
  rooms: number;
  surface: number;
};

export default function EditForm({ annonce }: { annonce: AnnonceProps }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    title: annonce.title,
    description: annonce.description,
    ville: annonce.ville,
    price: annonce.price.toString(),
    type: annonce.type,
    rooms: annonce.rooms.toString(),
    surface: annonce.surface.toString(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmEdit = async () => {
    try {
      const res = await fetch(`/api/annonces/${annonce.id}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          price: parseFloat(formValues.price),
          rooms: parseInt(formValues.rooms),
          surface: parseInt(formValues.surface),
        }),
      });

      const data = await res.text();

      if (!res.ok) throw new Error(data || 'Erreur lors de la mise à jour');
      router.push('/annonces');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      console.error('Erreur:', err);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-6 text-center">
          Modifier l&apos;annonce
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-[#ccc] rounded-xl p-6 shadow-md bg-transparent"
        >
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Titre</label>
            <input
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formValues.description}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              required
            />
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Ville</label>
            <input
              name="ville"
              type="text"
              value={formValues.ville}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              required
            />
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Prix (€)</label>
              <input
                name="price"
                type="number"
                min="0"
                value={formValues.price}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Type</label>
              <select
                name="type"
                value={formValues.type}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#405733] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733] appearance-none"
                required
              >
                <option className="bg-[#F9E7E7] text-[#405733]">Appartement</option>
                <option className="bg-[#F9E7E7] text-[#405733]">Maison</option>
                <option className="bg-[#F9E7E7] text-[#405733]">Studio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Pièces</label>
              <input
                name="rooms"
                type="number"
                min="1"
                value={formValues.rooms}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Surface (m²)</label>
              <input
                name="surface"
                type="number"
                min="1"
                value={formValues.surface}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
                required
              />
            </div>
          </div>

          {/* Bouton */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#405733] hover:bg-[#304624] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Modifier l&apos;annonce
            </button>
          </div>

          {error && <p className="text-center text-red-600">{error}</p>}
        </form>
      </div>

      {/* Modale de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#171717]">Confirmer la modification ?</h2>
            <div className="flex justify-center gap-4 pt-2">
              <button onClick={confirmEdit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Oui
              </button>
              <button onClick={() => setShowConfirm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
