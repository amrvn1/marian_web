import React from 'react';
import Link from 'next/link';
import { Home, Grid, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar(){
  return (
    <motion.header className="glass sticky top-4 mx-4 z-50 p-3" initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">LvlUp</Link>
        <nav className="space-x-4 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2"><Home size={16}/> Home</Link>
                    <Link href="/features" className="inline-flex items-center gap-2"><Grid size={16}/> Features</Link>
                    <Link href="/dashboard" className="inline-flex items-center gap-2"><User size={16}/> Dashboard</Link>
          <span className="ml-4"><a href="#" className="text-sm text-white/80">Docs</a></span>
          <span className="ml-3"><a href="#" className="text-sm text-white/80">Community</a></span>
          <div className="ml-4"><ThemeToggle /></div>
        </nav>
      </div>
    </motion.header>
  );
}
