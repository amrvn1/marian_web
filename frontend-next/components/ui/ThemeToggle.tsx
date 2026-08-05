import React, { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const [mode, setMode] = useState(() => localStorage.getItem('lvlup-theme') || 'dark');
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', mode); localStorage.setItem('lvlup-theme', mode); },[mode]);
  return (
    <button onClick={()=>setMode(m=> m==='dark'?'light':'dark')} className="ml-3 px-2 py-1 rounded bg-white/5">{mode==='dark'?'🌙':'🌤️'}</button>
  );
}
