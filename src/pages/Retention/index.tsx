import React, { useState } from 'react'
import NumberUserNewAndRetentionChart from '../../components/Retention/NumberUserNewAndRetentionChart';
import PercentRetentionUserChart from '../../components/Retention/PercentRetentionUserChart';
import TotalTimeUserPlayChart from '../../components/Retention/TotalTimeUserPlayChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';
import { Dayjs } from 'dayjs';
import { defaultRange } from '../../constant';

function Retention() {
  const [rangeValue, setRangeValue] = useState<[Dayjs, Dayjs]>(defaultRange)

  return (
    <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
      <div className='w-full flex justify-end'>
        <TimePickerCustom rangeValue={rangeValue} setRangeValue={setRangeValue} />
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-full md:w-[60%] p-[10px] overflow-hidden h-[480px]">
          <NumberUserNewAndRetentionChart />
        </div>
        <div className="w-full md:w-[40%] p-[10px] overflow-hidden h-[480px]">
          <PercentRetentionUserChart />
        </div>
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-full md:w-[50%] p-[10px] overflow-hidden h-[480px]">
          <TotalTimeUserPlayChart />
        </div>
      </div>
    </div>
  )
}

export default Retention