import { Card } from 'antd'
import React from 'react'
import SimpleAreaChart from '../Chart/SimpleAreaChart';

function PercentRetentionUserChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const firstCount = data?.[0]?.count || 1;
  const dataPrimary = data?.map((item: any, index: number) => ({
    ...item,
    name: "Day " + item?.returnDay,
    value: index === 0 ? 100 : ((item?.count * 100) / firstCount).toFixed(2),
  }));

  return (
    <Card className='shadow-md h-[480px]' title="Users retention">
      <div className='h-[380px] flex justify-center'>
        <SimpleAreaChart dataPrimary={dataPrimary} unit='%' />
      </div>
    </Card>
  )
}

export default PercentRetentionUserChart