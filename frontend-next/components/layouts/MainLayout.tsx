import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>LvlUp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45 }}
        className="min-h-screen px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </motion.main>
    </div>
  );
}
