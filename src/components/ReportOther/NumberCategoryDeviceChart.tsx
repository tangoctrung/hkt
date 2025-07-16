import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'
import { Card } from 'antd'

function NumberCategoryDeviceChart() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone' title="Số người dùng hoạt động theo danh mục thiết bị">
      <div className='max-h-[380px] flex justify-center'>
        <DoughnutChart />
      </div>
    </Card>
  )
}

export default NumberCategoryDeviceChart