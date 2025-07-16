import { Card } from 'antd'
import React from 'react'
import LineRoundChart from '../Chart/LineRoundChart'

function NumberUserNewAndRetentionChart() {

  const dataKey = ["newUser", "returningUser"]
  const dataExample = [
    {
      name: 'Tháng 1',
      newUser: 2000,
      returningUser: 400,
    },
    {
      name: 'Tháng 2',
      newUser: 1200,
      returningUser: 200,
    },
    {
      name: 'Tháng 3',
      newUser: 2000,
      returningUser: 300,
    },
    {
      name: 'Tháng 4',
      newUser: 2700,
      returningUser: 500,
    },
    {
      name: 'Tháng 5',
      newUser: 1700,
      returningUser: 300,
    },
    {
      name: 'Tháng 6',
      newUser: 2000,
      returningUser: 200,
    },
  ];
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="User retention">
      <div className='h-[380px] flex justify-center'>
        <LineRoundChart dataKey={dataKey} dataPrimary={dataExample} />
      </div>
    </Card>
  )
}

export default NumberUserNewAndRetentionChart