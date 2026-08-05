import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';

export default function Forgot(){
  async function handle(e){
    e.preventDefault();
    alert('If this were real, a reset link would be emailed (mock).');
  }
  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-3">Forgot Password</h2>
        <form onSubmit={handle}>
          <FormInput label="Email" type="email" />
          <div className="mt-4"><Button type="submit">Send reset link</Button></div>
        </form>
      </GlassCard>
    </MainLayout>
  );
}
