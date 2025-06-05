// lib/get-session.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSessionSafe() {
  return await getServerSession(authOptions);
}
