'use client';

import { UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session?.user?.email) return;

      const res = await fetch(`/api/user?email=${session.user.email}`);
      const data = await res.json();
      setUserData(data);
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div className="text-center mt-20">Chargement du profil...</div>;
  }

  const isProprietaire = userData.role === 'PROPRIETAIRE';

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header utilisateur */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex flex-col items-center">
            <UserCircle className="w-28 h-28 text-primary border border-[#1E1E1E] rounded-full p-1" />
            <button className="mt-2 text-sm text-primary underline hover:text-primary/80">
              Modifier
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1E1E1E]">
              {userData.prenom} {userData.nom}
            </h1>
            <p className="text-[#1E1E1E] font-medium">{userData.role}</p>
          </div>
        </div>

        <hr className="border-[#1E1E1E] mb-8" />

        {/* Bloc info */}
        <div className="border border-[#1E1E1E] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Informations</h2>
          <div className="space-y-2 text-[#1E1E1E]">
            <p><strong>Nom :</strong> {userData.nom}</p>
            <p><strong>Prénom :</strong> {userData.prenom}</p>
            <p><strong>Email :</strong> {userData.email}</p>
            <p><strong>Téléphone :</strong> {userData.telephone}</p>
            <p><strong>Rôle :</strong> {userData.role}</p>
            <p><strong>Inscription :</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Bloc annonces publiées ou likées */}
        <div className="border border-[#1E1E1E] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">
            {isProprietaire ? 'Mes Annonces Publiées' : 'Mes Annonces Likées'}
          </h2>

          {isProprietaire && (!userData.annonces || userData.annonces.length === 0) && (
            <p className="text-[#1E1E1E]">Aucune annonce publiée.</p>
          )}
          {isProprietaire && userData.annonces?.length > 0 && (
            <ul className="space-y-6">
              {userData.annonces.map((annonce: any) => (
                <Link key={annonce.id} href={`/annonces/${annonce.id}`}>
                  <li className="border border-[#1E1E1E] rounded-md p-4 cursor-pointer text-[#1E1E1E] transition hover:border-black">
                    <p className="font-medium">{annonce.title}</p>
                    <p className="text-sm">
                      Publiée le {new Date(annonce.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          )}

          {!isProprietaire && (!userData.likes || userData.likes.length === 0) && (
            <p className="text-[#1E1E1E]">Aucune annonce likée.</p>
          )}
          {!isProprietaire && userData.likes?.length > 0 && (
            <ul className="flex flex-col gap-6">
              {userData.likes.map((like: any) => (
                <Link key={like.annonce.id} href={`/annonces/${like.annonce.id}`}>
                  <li className="border border-[#1E1E1E] rounded-md p-4 cursor-pointer text-[#1E1E1E] transition hover:border-black">
                    <p className="font-medium">{like.annonce.title}</p>
                    <p className="text-sm">
                      Likée le {new Date(like.annonce.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
