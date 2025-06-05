'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "Comment fonctionne Dwell ?",
    answer:
      "Dwell est une plateforme qui met en relation directe les propriétaires et les locataires. Les propriétaires peuvent publier leurs biens et les locataires peuvent les rechercher selon leurs critères. Une fois qu'un locataire est intéressé, il peut contacter directement le propriétaire via notre messagerie intégrée.",
  },
  {
    question: "Est-ce que l'inscription est gratuite ?",
    answer:
      "Oui, l'inscription de base est totalement gratuite pour les locataires et les propriétaires. Nous proposons également des options premium avec des fonctionnalités supplémentaires pour les utilisateurs qui souhaitent bénéficier de services avancés.",
  },
  {
    question: "Comment sont vérifiés les profils des utilisateurs ?",
    answer:
      "Nous vérifions l'identité des utilisateurs via un processus de vérification en plusieurs étapes, incluant la validation de l'email, du numéro de téléphone et de pièces justificatives. Pour les propriétaires, nous vérifions également les documents attestant de la propriété du bien.",
  },
  {
    question: "Puis-je visiter un logement avant de le louer ?",
    answer:
      "Absolument ! Dwell facilite la mise en relation, mais nous encourageons toujours les visites physiques avant toute décision. Vous pouvez organiser des visites directement via notre messagerie intégrée.",
  },
  {
    question: "Comment sont gérés les contrats de location ?",
    answer:
      "Dwell propose des modèles de contrats conformes à la législation en vigueur, que les propriétaires peuvent personnaliser. La plateforme permet également la signature électronique des documents pour faciliter les démarches.",
  },
  {
    question: "Que faire en cas de litige entre propriétaire et locataire ?",
    answer:
      "Nous disposons d'un service de médiation qui peut intervenir en cas de désaccord. Notre équipe est formée pour aider à résoudre les conflits de manière équitable et dans le respect des droits de chacun.",
  },
];

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <AccordionItem
            value={`item-${index}`}
            className="border border-white/10 bg-[#2c2c2c] rounded-lg px-4"
          >
            <AccordionTrigger className="text-left text-white py-4 transition-none">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/90 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}
