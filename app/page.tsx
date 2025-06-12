'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Search, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { SearchForm } from '@/components/search-form';
import { HeroBackground } from '@/components/hero-background';
import { FeatureCard } from '@/components/feature-card';
import { StepCard } from '@/components/step-card';
import DernieresAnnoncesSectionClient from '@/components/sections/DernieresAnnoncesSectionClient';
import PublishAnnonceButton from '@/components/PublishAnnonceButton';

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* Hero Section */}
       <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#F9E7E7' }}>
  <HeroBackground />
  <div className="container px-4 md:px-6 relative z-10">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      <motion.div
        className="flex flex-col justify-center space-y-4 pl-8 md:pl-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            Trouvez votre <span className="text-accent">chez-vous</span> TEST
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Dwell met en relation propriétaires et locataires pour une expérience de location simple, sécurisée et transparente.
          </p>
        </div>
        <motion.div
          className="flex flex-col gap-2 min-[400px]:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/annonces">
            <Button size="lg" className="gap-1 bg-primary hover:bg-primary/90">
              Commencer maintenant <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#comment-ca-marche">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              En savoir plus
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Tabs defaultValue="locataire" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="locataire">Je cherche un logement</TabsTrigger>
            <TabsTrigger value="proprietaire">Je suis propriétaire</TabsTrigger>
          </TabsList>
          <TabsContent value="locataire" className="p-4 border rounded-lg mt-2 bg-white/80 backdrop-blur-sm min-h-[300px]">
            <SearchForm userType="locataire" />
          </TabsContent>
          <TabsContent value="proprietaire" className="p-4 border rounded-lg mt-2 bg-white/80 backdrop-blur-sm min-h-[300px] flex flex-col justify-center text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Vous êtes propriétaire et vous voulez publier une annonce ? C'est ici !
            </p>
            <PublishAnnonceButton/>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  </div>
</section>


        {/* Fonctionnalités */}
        <section className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#353535' }}>
          <div className="container px-4 md:px-6">
            <motion.div className="text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Pourquoi choisir <span className="text-[#F9E7E7]">Dwell</span> ?</h2>
              <p className="text-[#f3f3f3] text-lg md:text-xl max-w-[900px] mx-auto">
                Notre plateforme offre des avantages uniques pour faciliter la mise en relation entre propriétaires et locataires.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
              <FeatureCard icon={<Shield className="h-10 w-10" style={{ color: '#405733' }} />} title="Sécurité garantie" description="Vérification des profils et des biens immobiliers pour des transactions en toute confiance." />
              <FeatureCard icon={<Search className="h-10 w-10" style={{ color: '#405733' }} />} title="Recherche avancée" description="Filtres personnalisés pour trouver rapidement le logement ou le locataire qui correspond à vos critères." />
              <FeatureCard icon={<MessageSquare className="h-10 w-10" style={{ color: '#405733' }} />} title="Communication directe" description="Messagerie intégrée pour échanger facilement et organiser des visites sans intermédiaire." />
            </motion.div>
          </div>
        </section>

        {/* Étapes */}
        <section id="comment-ca-marche" className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#F9E7E7' }}>
          <div className="container px-4 md:px-6">
            <motion.div className="text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Comment ça marche</h2>
              <p className="text-lg md:text-xl text-[#3D3D3D] max-w-[900px] mx-auto">
                Un processus simple en quelques étapes pour trouver votre logement ou votre locataire idéal.
              </p>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
              <StepCard number={1} title="Créez votre profil" description="Inscrivez-vous en tant que propriétaire ou locataire et complétez votre profil avec vos informations." />
              <StepCard number={2} title="Publiez ou recherchez" description="Publiez votre bien ou recherchez parmi les annonces disponibles selon vos critères." />
              <StepCard number={3} title="Entrez en contact" description="Échangez directement via notre messagerie et finalisez votre location en toute simplicité." />
            </motion.div>
          </div>
        </section>

        {/* Annonces dynamiques */}
        <DernieresAnnoncesSectionClient />

        {/* Témoignages */}
        <section id="temoignages" className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#F9E7E7' }}>
          <div className="container px-4 md:px-6">
            <motion.div className="text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Ce que disent nos utilisateurs</h2>
              <p className="text-[#171717] text-lg md:text-xl max-w-[900px] mx-auto">
                Découvrez les témoignages de propriétaires et locataires satisfaits.
              </p>
            </motion.div>
            <Testimonials />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-[#353535]">
          <div className="container px-4 md:px-6">
            <motion.div className="text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Questions fréquentes</h2>
              <p className="text-white text-lg md:text-xl max-w-[900px] mx-auto">
                Trouvez les réponses à vos questions sur notre plateforme.
              </p>
            </motion.div>
            <motion.div className="mx-auto max-w-3xl py-12 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
              <FAQ />
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Prêt à commencer ?</h2>
            <p className="max-w-[900px] mx-auto text-lg md:text-xl">
              Rejoignez notre communauté et trouvez votre logement idéal ou votre locataire parfait dès aujourd'hui.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/inscription">
                <Button size="lg" className="gap-1 bg-[#353535] text-white hover:bg-[#2c2c2c] border border-transparent">
                  S'inscrire gratuitement <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/inscription/en-savoir-plus">
                <Button size="lg" variant="outline" className="gap-1">
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
