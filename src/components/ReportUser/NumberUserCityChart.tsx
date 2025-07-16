import { Card } from 'antd'
import React from 'react'
import LineCustomChart from '../Chart/LineCustomChart'

function NumberUserCityChart() {

  const labelsExample = ["Thành phố", "Số người sử dụng"]
  const dataExample = [
    {
      label: "Hanoi",
      value: 450
    },
    {
      label: "Ho Chi Minh",
      value: 520
    },
    {
      label: "Haiphong",
      value: 344
    },
    {
      label: "Danang",
      value: 356
    },
    {
      label: "Dongnai",
      value: 223
    },
  ]

  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by city">
      <LineCustomChart dataPrimary={dataExample} labelsPrimary={labelsExample} />
    </Card>
  )
}

export default NumberUserCityChart