import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function Finance(){
  return (
    <MainLayout>
      <GlassCard className="p-6">
        <h2>Finance, Health & Habits (skeleton)</h2>
        <ul className="mt-3 list-disc ml-6 text-sm opacity-90">
          <li>Budgets & Expenses</li>
          <li>Health tracking</li>
          <li>Habit tracker</li>
        </ul>
      </GlassCard>
    </MainLayout>
  );
}
