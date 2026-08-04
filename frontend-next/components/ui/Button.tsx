import React from 'react';

export default function Button({ children, className = '', ...props }: any){
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 text-white shadow-lg hover:opacity-95 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
