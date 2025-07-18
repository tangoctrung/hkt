import { Empty } from 'antd';
import React from 'react'

function EmptyData({
  type
}: {
  type: string;
}) {
  return (
    <div className='mt-10'>
      <Empty></Empty>
    </div>
  )
}

export default EmptyData