// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // ✅ Active les server actions
  },
  // Ajoute d'autres options ici si nécessaire
  images: {
    domains: ['localhost', 'your-domain.com'], // remplace par tes domaines d'images si besoin
  },
  typescript: {
    ignoreBuildErrors: false, // 🛑 Garde à false pour éviter les erreurs non traitées
  },
  eslint: {
    ignoreDuringBuilds: false, // 🛑 Garde à false pour corriger les erreurs ESLint avant le build
  },
};

export default nextConfig;
