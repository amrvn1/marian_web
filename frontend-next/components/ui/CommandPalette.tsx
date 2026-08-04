import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useRouter } from 'next/router';

const commands = [
  { id: 'home', label: 'Go to Home', href: '/' },
  { id: 'dashboard', label: 'Open Dashboard', href: '/dashboard' },
  { id: 'features', label: 'Show Features', href: '/features' },
  { id: 'academic', label: 'Open Academic Module', href: '/modules/academic' }
];

export default function CommandPalette(){
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o=>!o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  const results = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-20">
      <motion.div initial={{opacity:0, y:-8}} animate={{opacity:1,y:0}} className="glass w-full max-w-2xl p-4">
        <div className="flex items-center gap-3">
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} className="flex-1 p-3 bg-transparent border border-white/10 rounded-md outline-none" placeholder="Type a command (Ctrl+K)" />
          <div className="text-sm text-white/60">Ctrl+K</div>
        </div>
        <div className="mt-3">
          {results.map(r => (
            <div key={r.id} onClick={()=>{ router.push(r.href); setOpen(false); }} className="p-2 rounded hover:bg-white/5 cursor-pointer">{r.label}</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
