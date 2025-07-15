import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      label: '# of Votes',
      data: [120, 158, 20,],
      backgroundColor: [
        '#0088FE90',
        '#00C49F90',
        '#FFBB2890',
      ],
      borderColor: [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
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
        size: 14,
      },
    },
  },
};

function DoughnutChart() {
  return (
    <Doughnut data={data} options={options} />
  )
}

export default DoughnutChart