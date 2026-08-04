import React, { useEffect, useState } from 'react';

export default function CustomCursor(){
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(()=>{
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return ()=> window.removeEventListener('mousemove', move);
  },[]);

  return (
    <div style={{position:'fixed',left:0,top:0,pointerEvents:'none',zIndex:9999}}>
      <div style={{transform:`translate(${pos.x - 10}px, ${pos.y - 10}px)`, width:20, height:20, borderRadius:10, background:'rgba(255,255,255,0.12)', boxShadow:'0 4px 20px rgba(124,77,255,0.15)', border:'1px solid rgba(255,255,255,0.2)'}} />
    </div>
  );
}
