import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Button from '../components/ui/Button';

export default function Home(){
  return (
    <MainLayout>
      <AnimatedBackground />
      <div className="py-10">
        <GlassCard className="p-8">
          <h1 className="text-3xl font-bold mb-3">LvlUp — Study, Level, Conquer</h1>
          <p className="mb-6">A modular productivity & gamified study platform inspired by Solo Leveling.</p>
          <div className="flex gap-3">
            <Button>Get Started</Button>
            <Button className="bg-transparent border border-white/10">Explore</Button>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
}
