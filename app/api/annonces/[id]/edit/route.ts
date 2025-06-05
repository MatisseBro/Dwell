import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { handleUpdateAnnonce } from '@/lib/handlers/annonce';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const response = await handleUpdateAnnonce(params.id, body);
  revalidatePath('/annonces');
  return response;
}
