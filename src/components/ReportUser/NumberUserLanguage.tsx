import { Card } from 'antd'
import React from 'react'
import CustomBarChart from '../Chart/BarChart';

function NumberUserLanguage() {

  const dataExample = [
    { name: 'Vietnamese', value: 112378 },
    { name: 'English', value: 56670 },
    { name: 'Chinese', value: 33434 },
    { name: 'Japanese', value: 22675 },
    { name: 'Korean', value: 26222 },

  ];
  return (
    <Card className='shadow-md h-[400px] overflow-y-scroll viewScrollNone' title="Users active by language">
      <div className='w-full flex justify-center'>
        <CustomBarChart dataKey='NumberUserLanguage' dataPrimary={dataExample} />
      </div>
    </Card>
  )
}

export default NumberUserLanguage