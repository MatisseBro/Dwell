'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, UserCircle, Heart, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useSession, signOut } from 'next-auth/react';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}
      style={{ backgroundColor: isScrolled ? '#353535cc' : '#353535' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Logo Centered */}
        <div className="flex-1 flex justify-center md:hidden relative">
          <Link href="/" className="flex items-center absolute -top-8">
            <Image
              src="/uploads/logo-dwell.png"
              alt="Dwell Logo"
              width={200}
              height={80}
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex items-center gap-2 ml-48 mt-5">
          <Image
            src="/uploads/logo-dwell.png"
            alt="Dwell Logo"
            width={240}
            height={80}
            className="h-20 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ml-6">
          <Link href="/annonces" className="text-sm font-medium text-white hover:text-[#405733] transition-colors">
            Annonces
          </Link>
          <Link href="/#fonctionnalites" className="text-sm font-medium text-white hover:text-[#405733] transition-colors">
            Fonctionnalités
          </Link>
          <Link href="/#comment-ca-marche" className="text-sm font-medium text-white hover:text-[#405733] transition-colors">
            Comment ça marche
          </Link>
          <Link href="/#temoignages" className="text-sm font-medium text-white hover:text-[#405733] transition-colors">
            Témoignages
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-white hover:text-[#405733] transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop user actions */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user && (
              <>
                <span className="border border-white text-white text-xs px-2 py-0.5 rounded-md">
                  {session.user.role}
                </span>
                <Link href="/likes" className="text-white hover:text-red-500">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link href="/messages" className="text-white hover:text-blue-500">
                  <Mail className="w-6 h-6" />
                </Link>
                <Link href="/profil" className="text-white hover:text-[#405733]">
                  <UserCircle className="w-6 h-6" />
                </Link>
              </>
            )}

            {status === 'loading' ? null : session?.user ? (
              <Button
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Se déconnecter
              </Button>
            ) : (
              <>
                <Link href="/connexion">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:text-[#405733] hover:border-[#405733]"
                  >
                    Se connecter
                  </Button>
                </Link>
                <Link href="/inscription">
                  <Button
                    size="sm"
                    className="bg-white text-[#353535] hover:bg-gray-200"
                  >
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#353535] text-white">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col h-full">
                <nav className="flex flex-col divide-y divide-white/20">
                  <Link href="/annonces" className="text-lg font-medium hover:text-[#405733] transition-colors py-4">
                    Annonces
                  </Link>
                  <Link href="/#fonctionnalites" className="text-lg font-medium hover:text-[#405733] transition-colors py-4">
                    Fonctionnalités
                  </Link>
                  <Link href="/#comment-ca-marche" className="text-lg font-medium hover:text-[#405733] transition-colors py-4">
                    Comment ça marche
                  </Link>
                  <Link href="/#temoignages" className="text-lg font-medium hover:text-[#405733] transition-colors py-4">
                    Témoignages
                  </Link>
                  <Link href="/#faq" className="text-lg font-medium hover:text-[#405733] transition-colors py-4">
                    FAQ
                  </Link>
                  {session?.user && (
                    <>
                      <Link href="/likes" className="flex items-center gap-2 text-lg font-medium hover:text-red-500 transition-colors py-4">
                        <Heart className="w-5 h-5" />
                        Annonces Likées
                      </Link>
                      <Link href="/messages" className="flex items-center gap-2 text-lg font-medium hover:text-blue-500 transition-colors py-4">
                        <Mail className="w-5 h-5" />
                        Messagerie
                      </Link>
                      <Link href="/profil" className="flex items-center gap-2 text-lg font-medium hover:text-[#405733] transition-colors py-4">
                        <UserCircle className="w-5 h-5" />
                        Mon Profil
                      </Link>
                    </>
                  )}
                </nav>

                <div className="mt-auto flex flex-col gap-2 py-4 border-t border-white/20">
                  {session?.user && (
                    <p className="text-sm text-muted-foreground text-center text-white/70">
                      {session.user.email}
                    </p>
                  )}
                  {status === 'loading' ? null : session?.user ? (
                    <Button
                      className="w-full bg-red-500 text-white hover:bg-red-600"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      Se déconnecter
                    </Button>
                  ) : (
                    <>
                      <Link href="/connexion">
                        <Button variant="outline" className="w-full border-white text-white hover:text-[#405733] hover:border-[#405733]">
                          Se connecter
                        </Button>
                      </Link>
                      <Link href="/inscription">
                        <Button className="w-full bg-white text-[#353535] hover:bg-gray-200">
                          S'inscrire
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
