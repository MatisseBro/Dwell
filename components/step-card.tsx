'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StepCard({
  number,
  title,
  description,
  className = '',
  style,
}: StepCardProps) {
  return (
    <motion.div
      className={`flex flex-col items-center text-center border border-[#353535] rounded-xl p-6 transition-all ${className}`}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-[#3D3D3D]">{description}</p>
    </motion.div>
  );
}
