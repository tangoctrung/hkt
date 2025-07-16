import { Card } from 'antd'
import React from 'react'
import LineCustomChart from '../Chart/LineCustomChart'

function NumberUserAgeChart() {

  const labelsExample = ["Độ tuổi", "Số người"]
  const dataExample = [
    {
      label: "0-10 tuổi",
      value: 10
    },
    {
      label: "10-15 tuổi",
      value: 520
    },
    {
      label: "15-20 tuổi",
      value: 4344
    },
    {
      label: "20-30 tuổi",
      value: 3356
    },
    {
      label: "30-40 tuổi",
      value: 1223
    },
    {
      label: ">40 tuổi",
      value: 223
    },
  ]

  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by city">
      <LineCustomChart dataPrimary={dataExample} labelsPrimary={labelsExample} />
    </Card>
  )
}

export default NumberUserAgeChart