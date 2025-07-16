import React from 'react'
import { Card } from 'antd'
import LineCustomChart from '../Chart/LineCustomChart'

function NumberOSUserChart() {
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by operating system">
      <LineCustomChart />
    </Card>
  )
}

export default NumberOSUserChart