import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,         // active l’App Router
    serverActions: true,  // active la directive 'use server'
  },
  // … vos autres options ici
};

export default nextConfig;
