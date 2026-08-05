import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground(){
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[140%] h-[140%] bg-gradient-to-br from-[#1f0743] via-[#0b2b4e] to-[#001219] opacity-60 blur-2xl"
      />
    </div>
  );
}
