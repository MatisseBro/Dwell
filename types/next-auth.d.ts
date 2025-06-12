// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: number;
      email: string;
      nom: string;
      prenom: string;
      role: 'LOCATAIRE' | 'PROPRIETAIRE';
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: 'LOCATAIRE' | 'PROPRIETAIRE';
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: 'LOCATAIRE' | 'PROPRIETAIRE';
  }
}
