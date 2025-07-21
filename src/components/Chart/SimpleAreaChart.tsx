import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Ngày 1',
    value: 4000,
  },
  {
    name: 'Ngày 4',
    value: 3000,
  },
  {
    name: 'Ngày 7',
    value: 2000,
  },
  {
    name: 'Ngày 14',
    value: 2780,
  },
  {
    name: 'Ngày 20',
    value: 1890,
  },
  {
    name: 'Ngày 29',
    value: 2390,
  },
  {
    name: 'Ngày 42',
    value: 3490,
  },
];

export default function SimpleAreaChart({ dataPrimary, unit, isCustomDate }: {


  dataPrimary?: any[];
  unit: string;
  isCustomDate?: boolean;
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
        <Tooltip content={<CustomTooltip unit={unit} isCustomDate={isCustomDate} />} />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, unit, isCustomDate }: any) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p>{isCustomDate ? new Date(item.date).toDateString() : item?.name}</p>
        <p>{item?.value}{unit}</p>
      </div>
    );
  }

  return null;
};