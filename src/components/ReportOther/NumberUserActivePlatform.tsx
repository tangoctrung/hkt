import React from 'react'
import PieChartDevice from '../Chart/PieChartDevice'
import { Card } from 'antd'

function NumberUserActivePlatform() {
  return (
    <Card className='shadow-md h-[480px] w-full' title="Number of active users by platform">
      <div className='max-h-[380px] w-full flex justify-center'>
        <PieChartDevice />
      </div>
    </Card>
  )
}

export default NumberUserActivePlatform