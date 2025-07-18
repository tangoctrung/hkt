import { Card } from 'antd'
import React from 'react'
import LineRoundChart from '../Chart/LineRoundChart'
import { formatTimeStringToDDMM } from '../../utils';

function NumberUserNewAndOldChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const dataKey = ["newUsers", "activeUsers"]

  const dataPrimary = data?.map(item => ({
    ...item,
    name: formatTimeStringToDDMM(item?.date)
  }))

  return (
    <Card className='shadow-md h-[480px] overflow-y-scroll viewScrollNone' title="Number of active and new users">
      <div className='h-[380px] flex justify-center'>
        <LineRoundChart dataKey={dataKey} dataPrimary={dataPrimary} />
      </div>
    </Card>
  )
}

export default NumberUserNewAndOldChart