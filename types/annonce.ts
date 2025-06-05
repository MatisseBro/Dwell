// types/annonce.ts

export type Annonce = {
  id: number;
  title: string;
  ville: string;
  price: number;
  type: string;
  surface: number;
  rooms: number;
  images: string[];
};
