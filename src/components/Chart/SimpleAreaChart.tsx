import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Ngày 1',
    time: 4000,
  },
  {
    name: 'Ngày 4',
    time: 3000,
  },
  {
    name: 'Ngày 7',
    time: 2000,
  },
  {
    name: 'Ngày 14',
    time: 2780,
  },
  {
    name: 'Ngày 20',
    time: 1890,
  },
  {
    name: 'Ngày 29',
    time: 2390,
  },
  {
    name: 'Ngày 42',
    time: 3490,
  },
];

export default function SimpleAreaChart({ dataPrimary, unit }: {
  dataPrimary?: any[];
  unit: string
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={dataPrimary || data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value} ` + unit} />
        <Tooltip />
        <Area type="monotone" dataKey="time" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
