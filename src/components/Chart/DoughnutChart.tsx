import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const options = {
  plugins: {
    datalabels: {
      color: '#fff',
      font: {
        size: 14,
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

function DoughnutChart({
  data
}: { data?: any }) {

  const dataExample = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'users: ',
        data: [120, 158, 20,],
        backgroundColor: [
          '#0088FE',
          '#00C49F',
          '#FFBB28',
        ],
      },
    ],
  };
  return (
    <Doughnut data={data || dataExample} options={options} className='h-full' />
  )
}

export default DoughnutChart