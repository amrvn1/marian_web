import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ full_name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

export default function Register(){
  const { register, handleSubmit, formState:{errors} } = useForm({ resolver: zodResolver(schema) });
  async function onSubmit(data){
    const res = await fetch('/api/auth/register', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    if (res.ok) alert('Registered (mock)'); else alert('Registration failed');
  }

  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-3">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Full name" {...register('full_name')} />
          <FormInput label="Email" type="email" {...register('email')} />
          <FormInput label="Password" type="password" {...register('password')} />
          <div className="mt-4"><Button type="submit">Create account</Button></div>
        </form>
      </GlassCard>
    </MainLayout>
  );
}
