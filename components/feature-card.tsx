'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        className="h-full bg-muted border-2 transition-colors hover:border-accent/50"
        style={{ borderColor: '#1E1E1E' }}
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">{description}</p> {/* ✅ blanc forcé */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
