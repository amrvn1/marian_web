import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [ {name:'Mon', xp:10},{name:'Tue', xp:20},{name:'Wed', xp:40},{name:'Thu', xp:60},{name:'Fri', xp:80},{name:'Sat', xp:120},{name:'Sun', xp:160} ];

export default function SampleChart(){
  return (
    <div style={{width:'100%', height:220}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="xp" stroke="#7c4dff" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
