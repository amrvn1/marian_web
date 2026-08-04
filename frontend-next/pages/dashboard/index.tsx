import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Dashboard(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2 className="text-2xl font-semibold">Student Dashboard (Prototype)</h2>
        <p className="mt-2 text-sm opacity-90">Widgets: Tasks, Timer, XP, Avatar, Progress.</p>
      </GlassCard>
    </MainLayout>
  );
}
