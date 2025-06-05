'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function PublishAnnonceButton() {
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setError('');
  }, []);

  const handleClick = async () => {
    const session = await getSession();

    if (!session) {
      setError('Veuillez vous connecter pour publier une annonce.');
      return;
    }

    if (session.user.role === 'LOCATAIRE') {
      setError('Vous devez être connecté en tant que PROPRIÉTAIRE pour publier une annonce.');
      return;
    }

    router.push('/annonces/create');
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white"
        onClick={handleClick}
      >
        Publier une annonce
      </Button>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </div>
  );
}
