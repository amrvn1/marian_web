import React from 'react';

export default function SimpleTable({ columns = [], data = [] }:{columns:string[]; data:any[]}){
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map(c=> <th key={c} className="text-left p-2 text-white/70">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i)=> (
            <tr key={i} className="border-t border-white/6">
              {columns.map((c)=> <td key={c} className="p-2">{row[c] ?? '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
