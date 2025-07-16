import { Card } from 'antd'
import React from 'react'
import LineRoundChart from '../Chart/LineRoundChart'

function NumberUserNewAndOldChart() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone' title="Number of old and new users">
      <div className='h-[380px] flex justify-center'>
        <LineRoundChart />
      </div>
    </Card>
  )
}

export default NumberUserNewAndOldChart