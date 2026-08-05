import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import GlassCard from '../../components/ui/GlassCard';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export default function Login(){
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  async function onSubmit(data:any){
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    if (res.ok){
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      localStorage.setItem('user', JSON.stringify(json.user));
      alert('Logged in (mock)');
      window.location.href = '/dashboard';
    } else {
      alert('Login failed');
    }
  }

  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-3">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Email" type="email" {...register('email')} />
          <FormInput label="Password" type="password" {...register('password')} />
          <div className="mt-4"><Button type="submit">Sign in</Button></div>
        </form>
      </GlassCard>
    </MainLayout>
  );
}
