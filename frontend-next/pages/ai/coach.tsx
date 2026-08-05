import React, { useState } from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

export default function Coach(){
  const [messages, setMessages] = useState([] as any[]);
  const [text, setText] = useState('');
  async function send(){
    if (!text) return;
    setMessages(m=>[...m, { from: 'user', text }]);
    setText('');
    const res = await fetch('/api/ai/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) });
    const json = await res.json();
    setMessages(m=>[...m, { from: 'bot', text: json.reply }]);
  }
  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">AI Coach (Mock)</h2>
        <div className="mt-4 space-y-3">
          {messages.map((m,i)=>(<div key={i} className={`p-2 rounded ${m.from==='user'?'bg-white/6':'bg-white/4'}`}>{m.text}</div>))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 bg-transparent border border-white/10 rounded" />
          <Button onClick={send}>Send</Button>
        </div>
      </GlassCard>
    </MainLayout>
  );
}
