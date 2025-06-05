'use client';

import { useSession } from 'next-auth/react';

export default function RoleChecker() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Chargement...</p>;
  if (!session) return <p>Utilisateur non connecté</p>;

  return (
    <div className="p-4 border rounded">
      <p>Connecté en tant que : {session.user.email}</p>
      <p>Rôle : {session.user.role}</p>

      {session.user.role === 'PROPRIETAIRE' && <p>Bienvenue propriétaire 👑</p>}
      {session.user.role === 'LOCATAIRE' && <p>Bienvenue locataire 🏠</p>}
    </div>
  );
}
