import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

type CustomUser = {
  id: number;
  email: string;
  role: Role;
  nom: string;
  prenom: string;
};

type CustomToken = JWT & {
  id?: number;
  email?: string;
  role?: Role;
  nom?: string;
  prenom?: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          nom: user.nom,
          prenom: user.prenom,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<CustomToken> {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = user.email;
        token.role = (user as CustomUser).role;
        token.nom = (user as CustomUser).nom;
        token.prenom = (user as CustomUser).prenom;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user && token) {
        session.user.id = (token as CustomToken).id!;
        session.user.email = token.email!;
        session.user.role = (token as CustomToken).role!;
        session.user.nom = (token as CustomToken).nom!;
        session.user.prenom = (token as CustomToken).prenom!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/connexion',
    error: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
