import React from 'react';

export default function FormInput({ label, ...props }: any){
  return (
    <label className="block mb-3">
      <div className="text-sm mb-1 opacity-90">{label}</div>
      <input className="w-full p-3 bg-transparent border border-white/10 rounded-md outline-none" {...props} />
    </label>
  );
}
