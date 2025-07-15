import React from 'react'
import PieChartDevice from '../Chart/PieChartDevice'
import { Card } from 'antd'

function NumberUserActivePlatform() {
  return (
    <Card className='h-[480px]'>
      <h3 className='mb-4'>Số người dùng hoạt động theo nền tảng</h3>
      <PieChartDevice />
    </Card>
  )
}

export default NumberUserActivePlatform