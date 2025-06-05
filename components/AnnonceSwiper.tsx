'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

interface AnnonceSwiperProps {
  images: string[];
}

export default function AnnonceSwiper({ images }: AnnonceSwiperProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      loop
      className="rounded-lg overflow-hidden mb-8"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[400px]">
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
