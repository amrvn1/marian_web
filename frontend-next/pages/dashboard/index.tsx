import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

import SampleChart from '../../components/charts/SampleChart';

export default function Dashboard(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Student Dashboard</h2>
            <p className="mt-2 text-sm opacity-90">Widgets: Tasks, Timer, XP, Avatar, Progress.</p>
            <div className="mt-4"><SampleChart /></div>
          </div>
          <div>
            <h3 className="text-lg font-medium">XP & Rank</h3>
            <div className="mt-3">Level: <strong>5</strong></div>
            <div className="mt-2">XP: <strong>1,240</strong></div>
          </div>
        </div>
      </GlassCard>
    </MainLayout>
  );
}
