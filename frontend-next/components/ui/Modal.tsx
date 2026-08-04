import React from 'react';
import { motion } from 'framer-motion';

export default function Modal({ open, onClose, children }:{open:boolean; onClose:()=>void; children:React.ReactNode}){
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <motion.div initial={{scale:0.96, opacity:0}} animate={{scale:1, opacity:1}} className="glass p-4 max-w-lg mx-4 z-10">{children}</motion.div>
    </div>
  );
}
