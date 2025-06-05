'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SearchFormProps {
  userType: 'locataire' | 'proprietaire';
}

export function SearchForm({ userType }: SearchFormProps) {
  const router = useRouter();

  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');
  const [rooms, setRooms] = useState('all');
  const [priceRange, setPriceRange] = useState([500, 1500]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (rooms) params.append('rooms', rooms);
    params.append('minPrice', priceRange[0].toString());
    params.append('maxPrice', priceRange[1].toString());
    router.push(`/annonces?${params.toString()}`);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid gap-4 text-gray-600"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {userType === 'locataire' ? (
        <>
          <motion.div className="grid gap-2" variants={itemVariants}>
            <Label htmlFor="location">Où cherchez-vous ?</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ville, code postal..."
              className="border-primary/20 focus:border-primary"
            />
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="grid gap-2">
              <Label htmlFor="type">Type de bien</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger
                  id="type"
                  className="border-primary/20 focus:border-primary text-gray-600"
                >
                  <SelectValue placeholder="Tous types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rooms">Pièces</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger
                  id="rooms"
                  className="border-primary/20 focus:border-primary text-gray-600"
                >
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          <motion.div className="grid gap-2" variants={itemVariants}>
            <div className="flex justify-between">
              <Label>Budget</Label>
              <span className="text-sm text-gray-600">
                {priceRange[0]}€ - {priceRange[1]}€ / mois
              </span>
            </div>
            <Slider
              defaultValue={[500, 1500]}
              max={3000}
              min={0}
              step={50}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div className="grid gap-2" variants={itemVariants}>
            <Label htmlFor="property-location">Adresse de votre bien</Label>
            <Input
              id="property-location"
              placeholder="Adresse complète"
              className="border-primary/20 focus:border-primary"
            />
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="grid gap-2">
              <Label htmlFor="property-type">Type de bien</Label>
              <Select>
                <SelectTrigger
                  id="property-type"
                  className="border-primary/20 focus:border-primary text-gray-600"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="property-rooms">Pièces</Label>
              <Select>
                <SelectTrigger
                  id="property-rooms"
                  className="border-primary/20 focus:border-primary text-gray-600"
                >
                  <SelectValue placeholder="Nombre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          <motion.div className="grid gap-2" variants={itemVariants}>
            <Label htmlFor="property-price">Loyer mensuel (€)</Label>
            <Input
              id="property-price"
              type="number"
              placeholder="Ex: 800"
              className="border-primary/20 focus:border-primary"
            />
          </motion.div>
        </>
      )}
      <motion.div variants={itemVariants}>
        <Button
          className="w-full mt-2 bg-primary hover:bg-primary/90"
          size="lg"
          onClick={handleSubmit}
        >
          <Search className="mr-2 h-4 w-4" />
          {userType === 'locataire' ? 'Rechercher' : 'Publier mon annonce'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
