import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Academic(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2>Academic Module (skeleton)</h2>
        <ul className="mt-3 list-disc ml-6 text-sm opacity-90">
          <li>Subjects</li>
          <li>Assignments</li>
          <li>Notes & Flashcards</li>
          <li>Planners & Pomodoro</li>
        </ul>
      </GlassCard>
    </MainLayout>
  );
}
