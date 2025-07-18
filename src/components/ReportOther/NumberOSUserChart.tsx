import React from 'react'
import { Card } from 'antd'
import LineCustomChart from '../Chart/LineCustomChart'
import EmptyData from '../common/EmptyData';

function NumberOSUserChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const labelsPrimary = ["Hệ điều hành", "Số người sử dụng"]
  const dataPrimary = data?.map(({ OSplatform, count }) => ({
    label: OSplatform,
    value: count
  }))
  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active users by operating system">
      {data && data?.length > 0 && <LineCustomChart dataPrimary={dataPrimary} labelsPrimary={labelsPrimary} />}
      {!data && <EmptyData type='' />}
    </Card>
  )
}

export default NumberOSUserChart