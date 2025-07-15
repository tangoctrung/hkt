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
        text: "",
      },
      datalabels: {
        display: false, // 👈 tắt hiện label trên điểm
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
        borderColor: '#0088FE',
        backgroundColor: '#0088FE90',
      },
      {
        label: 'Đăng ký',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: '#00C49F',
        backgroundColor: '#00C49F90',
      },
      {
        label: 'Lượt chơi',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: '#FFBB28',
        backgroundColor: '#FFBB2890',
      },
      {
        label: 'Mua vật phẩm',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: '#FF8042',
        backgroundColor: '#FF804290',
      },
    ],
  };
  return (
    <Line options={options} data={data} />
  )
}

export default LineChart