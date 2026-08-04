import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Gamification(){
  async function gainXP(){
    await fetch('/api/gamification/xp', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: 50 }) });
    alert('Gained 50 XP (mock).');
  }
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2 className="text-2xl font-semibold">Gamification</h2>
        <p className="mt-2 text-sm opacity-90">XP, Quests, Achievements (mock)</p>
        <div className="mt-4"><button onClick={gainXP} className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-cyan-400">Gain 50 XP</button></div>
      </GlassCard>
    </MainLayout>
  );
}
