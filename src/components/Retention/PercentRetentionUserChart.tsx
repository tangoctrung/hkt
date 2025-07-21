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
  const cohortDate = data?.[0]?.cohortDate || '';
  const dataPrimary = data?.map((item: any, index: number) => ({
    ...item,
    name: "Day " + (item?.returnDay - 1),
    value: index === 0 ? 100 : ((item?.count * 100) / firstCount).toFixed(2),
  }));

  return (
    <Card className='shadow-md h-[480px]' title="Users retention">
      <div className='h-[355px] flex justify-center'>
        <SimpleAreaChart dataPrimary={dataPrimary} unit='%' />
      </div>
      <div className='p-1 pl-10 justify-center text-center'>50 days start {cohortDate}</div>

    </Card>
  )
}

export default PercentRetentionUserChart