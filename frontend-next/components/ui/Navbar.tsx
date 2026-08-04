import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar(){
  return (
    <motion.header className="glass sticky top-4 mx-4 z-50 p-3" initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">LvlUp</Link>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </motion.header>
  );
}
