import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'
import { Card } from 'antd'

function NumberCategoryDeviceChart() {
  return (
    <Card className='h-[480px] overflow-y-scroll viewScrollNone'>
      <h3 className='mb-4'>Số người dùng hoạt động theo danh mục thiết bị</h3>
      <DoughnutChart />
    </Card>
  )
}

export default NumberCategoryDeviceChart