import { Card } from 'antd'
import React from 'react'
import SimpleAreaChart from '../Chart/SimpleAreaChart';

function PercentRetentionUserChart() {

  const dataExample = [
    {
      name: 'Ngày 1',
      time: 0.4,
    },
    {
      name: 'Ngày 4',
      time: 0.7,
    },
    {
      name: 'Ngày 7',
      time: 0.5,
    },
    {
      name: 'Ngày 14',
      time: 0.65,
    },
    {
      name: 'Ngày 20',
      time: 1,
    },
    {
      name: 'Ngày 29',
      time: 1.2,
    },
    {
      name: 'Ngày 42',
      time: 0.9,
    },
  ];
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Percent user retention">
      <div className='h-[380px] flex justify-center'>
        <SimpleAreaChart dataPrimary={dataExample} unit='%' />
      </div>
    </Card>
  )
}

export default PercentRetentionUserChart