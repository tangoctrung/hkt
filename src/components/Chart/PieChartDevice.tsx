import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const dataExample = {
  labels: ['Web', 'iOS', 'Android', 'ChromeOS'],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5],
      backgroundColor: [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
      ],
      borderColor: [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    datalabels: {
      color: '#fff',
      font: {
        size: 16,
      },
      formatter: (value: any, context: any) => {
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((acc: any, val: any) => acc + val, 0);
        const percentage = (value / total * 100).toFixed(1);
        return `${percentage}%`;
      },
    },
  },
};

function PieChart({
  data
}: { data?: any }) {
  return (
    <Pie data={data || dataExample} options={options} className='h-full w-full' />
  )
}

export default PieChart

