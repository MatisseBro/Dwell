'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bath, BedDouble, Home, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  annonceId: number;
  title: string;
  location: string;
  price: string;
  type: string;
  surface: string;
  rooms: string;
  imageUrl: string;
}

export function PropertyCard({
  annonceId,
  title,
  location,
  price,
  type,
  surface,
  rooms,
  imageUrl,
}: PropertyCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full border-2 border-muted hover:border-accent/50 transition-colors bg-[#1e1e1e]">
        {/* ✅ Image cliquable */}
        <Link href={`/annonces/${annonceId}`}>
          <div className="relative h-48 w-full overflow-hidden cursor-pointer">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              {type}
            </Badge>
          </div>
        </Link>

        {/* Titre / Ville / Prix */}
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <div className="flex items-center text-white text-sm">
                <MapPin className="h-3 w-3 mr-1 text-white" />
                {location}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-primary">{price}</div>
              <div className="text-xs text-white">
                Charges comprises
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Infos : Surface / Pièces / SDB */}
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between text-sm text-white">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1 text-primary" />
              {surface}
            </div>
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-primary" />
              {rooms} pièce{Number.parseInt(rooms) > 1 ? 's' : ''}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-primary" />
              {Math.max(1, Number.parseInt(rooms) - 1)} SDB
            </div>
          </div>
        </CardContent>

        {/* Bouton bas */}
        <CardFooter className="p-4 pt-0">
          <Link href={`/annonces/${annonceId}`} className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Voir le détail
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
