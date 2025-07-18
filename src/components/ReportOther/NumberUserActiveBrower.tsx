import React from 'react'
import { Card } from 'antd'
import HorizontalBarChart from '../Chart/HorizontalBarChart'
import EmptyData from '../common/EmptyData';

function NumberUserActiveBrower({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {
  const labelPrimary = data?.map(item => item?.browsers)
  const dataPrimary = data?.map(item => item?.count)
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by browser">
      <div className='max-h-[380px] w-full'>
        {data && data?.length > 0 && <HorizontalBarChart labelsPrimary={labelPrimary} dataPrimary={dataPrimary} />}
        {!data && <EmptyData type='' />}
      </div>
    </Card>
  )
}

export default NumberUserActiveBrower