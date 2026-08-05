import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';

export default function Onboarding(){
  const { register, handleSubmit } = useForm();
  function onSubmit(data){
    localStorage.setItem('lvlup-onboarding', JSON.stringify(data));
    alert('Onboarding saved (mock).');
    window.location.href = '/dashboard';
  }
  return (
    <MainLayout>
      <GlassCard className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Onboarding Wizard</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput label="University" {...register('university')} />
            <FormInput label="Degree" {...register('degree')} />
            <FormInput label="Semester" {...register('semester')} />
            <FormInput label="Target GPA" {...register('target_gpa')} />
            <FormInput label="Preferred Study Hours" {...register('study_hours')} />
            <FormInput label="Preferred Sleep Time" {...register('sleep_time')} />
          </div>
          <div className="mt-4"><Button type="submit">Finish Onboarding</Button></div>
        </form>
      </GlassCard>
    </MainLayout>
  );
}
