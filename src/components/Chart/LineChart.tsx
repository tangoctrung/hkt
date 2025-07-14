import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  title: string;
}
function LineChart({
  title
}: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Đăng nhập',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Đăng ký',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Lượt chơi',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: 'rgb(153, 162, 235)',
        backgroundColor: 'rgba(153, 162, 235, 0.5)',
      },
      {
        label: 'Mua vật phẩm',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: 'rgb(253, 162, 235)',
        backgroundColor: 'rgba(253, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Line options={options} data={data} />
  )
}

export default LineChart