import React from 'react';

export default function Badge({ children, className='' }:{children:React.ReactNode; className?:string}){
  return (<span className={`inline-block px-2 py-1 rounded-full bg-white/6 text-sm font-medium ${className}`}>{children}</span>);
}
