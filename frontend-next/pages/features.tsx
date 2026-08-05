import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import GlassCard from '../components/ui/GlassCard';

export default function Features(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2 className="text-2xl font-semibold">Modules</h2>
        <ul className="mt-4 space-y-2 text-sm opacity-90">
          <li>Foundation & Design System</li>
          <li>Landing Website</li>
          <li>Authentication & Onboarding</li>
          <li>Student Dashboard</li>
          <li>Academic Module</li>
          <li>Finance, Health & Habits</li>
          <li>Career & Networking</li>
          <li>Gamification Engine</li>
          <li>AI Coach & Analytics</li>
          <li>Backend & Deployment</li>
        </ul>
      </GlassCard>
    </MainLayout>
  );
}
