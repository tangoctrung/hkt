import { Card } from 'antd'
import React from 'react'
import SimpleAreaChart from '../Chart/SimpleAreaChart';
import { formatTimeStringToDDMM } from '../../utils';

function TotalTimeUserPlayChart({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const dataPrimary = data?.map((item: any) => ({
    ...item,
    name: formatTimeStringToDDMM(item?.date),
    value: item?.avgEngagementTimeSec,
  }));
  return (
    <Card className='shadow-md h-[480px]' title="User engagement">
      <div className='h-[380px] flex justify-center'>
        <SimpleAreaChart dataPrimary={dataPrimary} unit='s' isCustomDate={true} />
      </div>
    </Card>
  )
}

export default TotalTimeUserPlayChart