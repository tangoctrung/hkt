import React from 'react'
import PieChartDevice from '../Chart/PieChartDevice'
import { Card } from 'antd'

function NumberUserActivePlatform() {
  return (
    <Card className='h-[480px] w-full' title="Số người dùng hoạt động theo nền tảng">
      <div className='max-h-[380px] w-full flex justify-center'>
        <PieChartDevice />
      </div>
    </Card>
  )
}

export default NumberUserActivePlatform