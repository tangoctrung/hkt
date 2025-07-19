import { Card } from 'antd'
import React from 'react'
import LineRoundChart from '../Chart/LineRoundChart'
import { formatTimeStringToDDMM } from '../../utils';

function NumberUserNewAndRetentionChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const dataKey = ["newUsers", "returningUsers"]
  const dataPrimary = data?.map(item => ({
    ...item,
    returningUsers: (item?.newUsers - item?.activeUsers) >= 0 ? item?.newUsers - item?.activeUsers : 0,
    name: formatTimeStringToDDMM(item?.date)
  }))

  return (
    <Card className='shadow-md h-[480px]' title="New users and returning users">
      <div className='h-[380px] flex justify-center'>
        <LineRoundChart dataKey={dataKey} dataPrimary={dataPrimary} />
      </div>
    </Card>
  )
}

export default NumberUserNewAndRetentionChart