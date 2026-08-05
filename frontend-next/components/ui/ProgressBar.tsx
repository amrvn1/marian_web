import React from 'react';

export default function ProgressBar({ value=0 }:{value?:number}){
  return (
    <div className="w-full bg-white/6 rounded-full h-3">
      <div style={{width: `${Math.max(0, Math.min(100, value))}%`}} className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all" />
    </div>
  );
}
