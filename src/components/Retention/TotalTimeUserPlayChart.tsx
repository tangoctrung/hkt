import { Card } from 'antd'
import React from 'react'
import SimpleAreaChart from '../Chart/SimpleAreaChart';

function TotalTimeUserPlayChart() {

  const dataExample = [
    {
      name: 'Ngày 1',
      time: 23,
    },
    {
      name: 'Ngày 4',
      time: 7,
    },
    {
      name: 'Ngày 7',
      time: 24,
    },
    {
      name: 'Ngày 14',
      time: 19,
    },
    {
      name: 'Ngày 20',
      time: 30,
    },
    {
      name: 'Ngày 29',
      time: 46,
    },
    {
      name: 'Ngày 42',
      time: 32,
    },
  ];
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone' title="Total time user play">
      <div className='h-[380px] flex justify-center'>
        <SimpleAreaChart dataPrimary={dataExample} unit='m' />
      </div>
    </Card>
  )
}

export default TotalTimeUserPlayChart