import React from 'react'
import { Card } from 'antd'
import LineCustomChart from '../Chart/LineCustomChart'

function NumberOSUserChart() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone'>
      <h3 className='mb-4'>Số người dùng hoạt động theo hệ điều hành</h3>
      <LineCustomChart />
    </Card>
  )
}

export default NumberOSUserChart