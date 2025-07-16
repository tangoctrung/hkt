import React from 'react'
import { Card } from 'antd'
import HorizontalBarChart from '../Chart/HorizontalBarChart'

function NumberUserActiveBrower() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone' title="Số người dùng hoạt động theo trình duyệt">
      <div className='max-h-[380px] w-full'>
        <HorizontalBarChart />
      </div>
    </Card>
  )
}

export default NumberUserActiveBrower