export type Annonce = {
  id: number;
  title: string;
  createdAt: string;
};

export type Like = {
  annonce: Annonce;
};

export type UserData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'LOCATAIRE' | 'PROPRIETAIRE';
  createdAt: string;
  annonces?: Annonce[];
  likes?: Like[];
};
