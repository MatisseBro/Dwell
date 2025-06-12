'use client';

import { ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
  children: ReactNode;
}

export default function ClientProviders({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  // Empêche les erreurs d'hydratation liées au thème
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-screen bg-black" />; // Splash en dark
  }

  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"       // ✅ Thème sombre par défaut
        enableSystem={false}      // ✅ Ne pas suivre le thème système
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
