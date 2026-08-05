import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Career(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2>Career & Networking (skeleton)</h2>
        <ul className="mt-3 list-disc ml-6 text-sm opacity-90">
          <li>Resume Builder</li>
          <li>Job & Internship Tracker</li>
          <li>Mentor Directory</li>
        </ul>
      </GlassCard>
    </MainLayout>
  );
}
