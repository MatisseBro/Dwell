import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

type CustomUser = Pick<PrismaUser, 'id' | 'email' | 'role' | 'nom' | 'prenom'>;

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

        const { id, email, role, nom, prenom } = user;
        return { id, email, role, nom, prenom };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === 'object') {
        const u = user as CustomUser;
        token.id = u.id;
        token.email = u.email;
        token.nom = u.nom;
        token.prenom = u.prenom;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.email = token.email!;
        session.user.nom = token.nom!;
        session.user.prenom = token.prenom!;
        session.user.role = token.role!;
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
