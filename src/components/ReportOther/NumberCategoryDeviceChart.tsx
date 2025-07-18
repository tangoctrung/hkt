import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'
import { Card } from 'antd'
import { COLORS } from '../../constant';

function NumberCategoryDeviceChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {
  const dataPrimary = {
    labels: data?.map(item => item?.devices),
    datasets: [
      {
        label: 'users: ',
        data: data?.map(item => item?.count),
        backgroundColor: COLORS.slice(0, data?.length),
      },
    ],
  };
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by device category">
      <div className='max-h-[380px] flex justify-center'>
        <DoughnutChart data={dataPrimary} />
      </div>
    </Card>
  )
}

export default NumberCategoryDeviceChart