'use server';

import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function register(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const roleInput = formData.get('role')?.toString();
  const nom = formData.get('nom')?.toString();
  const prenom = formData.get('prenom')?.toString();
  const telephone = formData.get('telephone')?.toString();

  if (!email || !password || !roleInput || !nom || !prenom || !telephone) {
    return { error: 'Tous les champs sont requis.' };
  }

  if (!Object.values(Role).includes(roleInput as Role)) {
    return { error: 'Rôle invalide.' };
  }

  const digitCount = (password.match(/\d/g) || []).length;
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  if (password.length < 6 || digitCount < 2 || specialCount < 2) {
    return {
      error: 'Le mot de passe doit contenir au moins 2 chiffres, 2 caractères spéciaux et 6 caractères.',
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { telephone }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return { error: 'Un compte existe déjà avec cette adresse email.' };
    } else {
      return { error: 'Un compte existe déjà avec ce numéro de téléphone.' };
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nom,
      prenom,
      telephone,
      role: roleInput as Role,
    },
  });

  return { success: true };
}
