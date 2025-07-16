import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'
import { Card } from 'antd'

function NumberCategoryDeviceChart() {
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by device category">
      <div className='max-h-[380px] flex justify-center'>
        <DoughnutChart />
      </div>
    </Card>
  )
}

export default NumberCategoryDeviceChart