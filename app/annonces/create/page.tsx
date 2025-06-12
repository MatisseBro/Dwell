'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateAnnoncePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/annonces/create', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Échec de la création')

      router.push('/annonces')
    } catch (err) {
      setError('Une erreur est survenue.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-6 text-center">
          Créer une annonce
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-[#ccc] rounded-xl p-6 shadow-md bg-transparent"
        >
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Titre</label>
            <input
              name="title"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Ville</label>
            <input
              name="ville"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Prix (€)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Type</label>
              <select
                name="type"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#405733] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733] appearance-none"
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
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Surface (m²)</label>
              <input
                name="surface"
                type="number"
                min="1"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              />
            </div>
          </div>

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

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#405733] hover:bg-[#304624] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              {loading ? 'Publication…' : 'Publier l\'annonce'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
