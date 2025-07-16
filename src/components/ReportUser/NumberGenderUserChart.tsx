import React from 'react'
import { Card } from 'antd'
import PieChart from '../Chart/PieChartDevice'

function NumberGenderUserChart() {

  const data = {
    labels: ['Nam', 'Nữ', 'Khác'],
    datasets: [
      {
        label: '',
        data: [1200, 800, 200],
        backgroundColor: [
          '#0088FE',
          '#00C49F',
          '#FFBB28',
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
  return (
    <Card title="User gender" className='h-[480px] overflow-y-scroll viewScrollNone'>
      <div className='max-h-[380px] flex justify-center'>
        <PieChart data={data} />
      </div>
    </Card>
  )
}

export default NumberGenderUserChart