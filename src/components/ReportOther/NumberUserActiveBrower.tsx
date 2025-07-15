import React from 'react'
import { Card } from 'antd'
import HorizontalBarChart from '../Chart/HorizontalBarChart'

function NumberUserActiveBrower() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone'>
      <h3 className=''>Số người dùng hoạt động theo trình duyệt</h3>
      <HorizontalBarChart />
    </Card>
  )
}

export default NumberUserActiveBrower