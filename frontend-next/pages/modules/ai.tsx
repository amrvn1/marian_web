import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function AI(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2>AI Coach & Analytics (skeleton)</h2>
        <p className="mt-3 text-sm opacity-90">Chat interface, recommendations, and analytics dashboards will be added.</p>
      </GlassCard>
    </MainLayout>
  );
}
