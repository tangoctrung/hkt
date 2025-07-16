import React from 'react'
import { Card } from 'antd'
import HorizontalBarChart from '../Chart/HorizontalBarChart'

function NumberUserActiveBrower() {
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by browser">
      <div className='max-h-[380px] w-full'>
        <HorizontalBarChart />
      </div>
    </Card>
  )
}

export default NumberUserActiveBrower