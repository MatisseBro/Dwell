import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      nom: string;
      prenom: string;
      role: "LOCATAIRE" | "PROPRIETAIRE";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: "LOCATAIRE" | "PROPRIETAIRE";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: "LOCATAIRE" | "PROPRIETAIRE";
  }
}
