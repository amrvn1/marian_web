import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null as any);

export function useToast(){ return useContext(ToastContext); }

export default function ToastProvider({ children }: { children: React.ReactNode }){
  const [toasts, setToasts] = useState<any[]>([]);
  function push(t: { title: string; body?: string }){
    const id = Date.now().toString();
    setToasts(s=>[...s, { id, ...t }]);
    setTimeout(()=> setToasts(s=>s.filter(x=>x.id!==id)), 4500);
  }
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed right-4 bottom-6 space-y-2 z-50">
        {toasts.map(t=> (
          <div key={t.id} className="glass p-3 max-w-xs"> <div className="font-semibold">{t.title}</div> <div className="text-sm opacity-90">{t.body}</div> </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
