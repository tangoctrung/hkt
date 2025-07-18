import { Card } from 'antd'
import React from 'react'
import CustomBarChart from '../Chart/BarChart';
import { convertNameLanguage } from '../../utils';

function NumberUserLanguage({
  data,
  loading
}: {
  data: any[];
  loading?: boolean;
}) {

  const dataConvert = data?.map(item => ({
    ...item,
    language: convertNameLanguage(item?.language)
  }))

  const dataPrimary = dataConvert?.map(({ language, count }) => ({
    name: language,
    value: count
  }))
  return (
    <Card className='shadow-md h-[400px]' title="Users active by language">
      <div className='w-full flex justify-center'>
        <CustomBarChart dataKey='NumberUserLanguage' dataPrimary={dataPrimary} />
      </div>
    </Card>
  )
}

export default NumberUserLanguage