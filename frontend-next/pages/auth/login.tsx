import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Login(){
  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-3">Login</h2>
        <p className="text-sm opacity-90">Quick prototype login (form not wired).</p>
      </GlassCard>
    </MainLayout>
  );
}
