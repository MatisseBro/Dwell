import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { handleCreateAnnonce } from './actions';

export default async function CreateAnnoncePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/connexion');
  }

  if (session.user.role !== 'PROPRIETAIRE') {
    redirect('/annonces');
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-6 text-center">
          Créer une annonce
        </h1>

        <form
          action={handleCreateAnnonce}
          className="space-y-6 border border-[#ccc] rounded-xl p-6 shadow-md bg-transparent"
        >
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Titre</label>
            <input
              name="title"
              type="text"
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
                step="0.01"
                min="0"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Type</label>
              <select
                name="type"
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
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
                required
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
              Photos (maximum 5)
            </label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
            />
          </div>

          {/* Bouton */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#405733] hover:bg-[#304624] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Publier l&apos;annonce
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
