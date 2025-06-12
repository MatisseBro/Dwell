'use client';

import { useState } from 'react'; // ⬅️ Supprimé useEffect
import { Heart } from 'lucide-react';

export default function LikeButton({ annonceId, initialLiked }: { annonceId: number; initialLiked: boolean }) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annonceId }),
      });
      const data = await res.json();
      setLiked(data.liked);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`transition ${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
      aria-label="Liker l'annonce"
    >
      <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
    </button>
  );
}
