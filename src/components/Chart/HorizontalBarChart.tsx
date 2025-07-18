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
        size: 13,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        padding: 1
      },
    },
    x: {
      ticks: {
        padding: 1
      },
    },
  },
};


export default function HorizontalBarChart({ labelsPrimary, dataPrimary }: {
  labelsPrimary?: string[];
  dataPrimary?: any[]
}) {

  const setHeightBar = () => {
    if (!labelsPrimary) return 0
    if (labelsPrimary?.length <= 4) return 40
    if (labelsPrimary?.length >= 5 && labelsPrimary?.length <= 10) return 26
    if (labelsPrimary?.length >= 11 && labelsPrimary?.length <= 15) return 18
    if (labelsPrimary?.length >= 16) return 10
  }
  const labels = ['Chrome', 'MS Edge', 'Firefox', "Cốc cốc"];
  const data = {
    labels: labelsPrimary || labels,
    datasets: [
      {
        label: 'Người dùng',
        data: dataPrimary || [1300, 700, 300, 2500],
        backgroundColor: [
          '#0088FE',
        ],
        borderColor: [
          '#0088FE',
        ],
        borderWidth: 1,
        barThickness: setHeightBar(),
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };
  return <Bar options={options} data={data} className='w-full h-full' />;
}
