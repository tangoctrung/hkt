import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'bar'> = {
  indexAxis: 'x', // 👈 biểu đồ thanh ngang
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: '',
    },
    datalabels: {
      color: '#fff',
      font: {
        size: 14,
      },
    },
  },
};

export default function VerticalBarChart({ labelsPrimary, dataPrimary }: {
  labelsPrimary?: string[];
  dataPrimary?: any[]
}) {
  const labelsExample = ['Chrome', 'MS Edge', 'Firefox', "Cốc cốc"];

  const dataExample = {
    labels: labelsPrimary || labelsExample,
    datasets: [
      {
        label: 'Người dùng',
        data: dataPrimary || [1300, 700, 300, 2500],
        backgroundColor: [
          '#0088FE90',
        ],
        borderColor: [
          '#0088FE',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Bar options={options} data={dataExample} className='w-full h-full' />;
}
