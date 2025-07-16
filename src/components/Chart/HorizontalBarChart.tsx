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
  indexAxis: 'y', // 👈 biểu đồ thanh ngang
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

const labels = ['Chrome', 'MS Edge', 'Firefox', "Cốc cốc"];

const data = {
  labels,
  datasets: [
    {
      label: 'Người dùng',
      data: [1300, 700, 300, 2500],
      backgroundColor: [
        '#0088FE90',
        '#0088FE90',
        '#0088FE90',
        '#0088FE90',
      ],
      borderColor: [
        '#0088FE',
        '#0088FE',
        '#0088FE',
        '#0088FE',
      ],
      borderWidth: 1,
    },
  ],
};

export default function HorizontalBarChart() {
  return <Bar options={options} data={data} className='w-full h-full' />;
}
