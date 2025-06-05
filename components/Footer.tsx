'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t py-8 bg-[#353535]">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo + description */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/uploads/logo-dwell.png"
                alt="Dwell Logo"
                width={240}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-white mt-2">
              Dwell est une plateforme qui met en relation directe les
              propriétaires et les locataires pour une expérience de location
              simple, sécurisée et transparente.
            </p>
          </div>

          {/* Navigation & Légal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#fonctionnalites" className="text-sm text-white hover:text-primary transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="/#comment-ca-marche" className="text-sm text-white hover:text-primary transition-colors">
                    Comment ça marche
                  </Link>
                </li>
                <li>
                  <Link href="/#temoignages" className="text-sm text-white hover:text-primary transition-colors">
                    Témoignages
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-sm text-white hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/conditions-utilisation" className="text-sm text-white hover:text-primary transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/politique-de-confidentialite" className="text-sm text-white hover:text-primary transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/mentions-legales" className="text-sm text-white hover:text-primary transition-colors">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact + réseaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="text-sm text-white">Email: contact@dwell.fr</li>
              <li className="text-sm text-white">Téléphone: +33 1 23 45 67 89</li>
              <li className="text-sm text-white">Adresse: 123 Avenue des Champs-Élysées, 75008 Paris</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
                {/* Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
                {/* Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
                {/* Twitter */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-white">
            © 2025 Dwell. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
