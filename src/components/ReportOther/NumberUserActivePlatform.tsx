import React from 'react'
import PieChartDevice from '../Chart/PieChartDevice'
import { Card } from 'antd'
import { COLORS } from '../../constant';
import EmptyData from '../common/EmptyData';

function NumberUserActivePlatform({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const totalUsers = data?.reduce((sum: number, item: any) => sum + item.count, 0);
  const dataPrimary = {
    labels: ["website"],
    datasets: [
      {
        label: '',
        data: [totalUsers],
        backgroundColor: COLORS.slice(0, data?.length),
      },
    ],
  };

  return (
    <Card className='shadow-md h-[480px] w-full' title="Number of active users by platform">
      <div className='max-h-[380px] w-full flex justify-center'>
        {data && data?.length > 0 && <PieChartDevice data={dataPrimary} />}
        {!data && <EmptyData type='' />}
      </div>
    </Card>
  )
}

export default NumberUserActivePlatform