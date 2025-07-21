import React, { useEffect, useState } from 'react'
import NumberUserNewAndRetentionChart from '../../components/Retention/NumberUserNewAndRetentionChart';
import PercentRetentionUserChart from '../../components/Retention/PercentRetentionUserChart';
import TotalTimeUserPlayChart from '../../components/Retention/TotalTimeUserPlayChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';
import { Dayjs } from 'dayjs';
import { defaultRange } from '../../constant';
import { getDataSummaryService } from '../../endpoint/user/userService';
import Loading from '../../components/common/Loading';
import { getDatePicker } from '../../utils/date-picker';

function Retention() {
  const dataDateCache = getDatePicker()
  const [rangeValue, setRangeValue] = useState<[Dayjs, Dayjs]>((dataDateCache && dataDateCache?.length > 0) ? dataDateCache : defaultRange)
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getDataSummary() {
      setLoading(true)
      let fromDate: string = rangeValue[0].format("YYYY-MM-DD")
      let toDate: string = rangeValue[1].format("YYYY-MM-DD")
      const { success, data } = await getDataSummaryService({
        fromDate,
        toDate
      })
      if (success) {
        setData(data)
      }
      setLoading(false)
    }
    getDataSummary();
  }, [rangeValue])

  const distanceDate = rangeValue?.length > 1 ? rangeValue[1].diff(rangeValue[0], 'day') : 0

  return (
    <div className="p-4 space-y-6 w-full">
      <div className='w-full flex justify-end'>
        <TimePickerCustom rangeValue={rangeValue} setRangeValue={setRangeValue} />
      </div>
      <div className='mt-4 w-full flex flex-col md:flex-row'>
        <div className="w-full md:w-[60%] p-[10px] h-[480px]">
          <NumberUserNewAndRetentionChart data={data?.chartData || []} />
        </div>
        <div className="w-full md:w-[40%] p-[10px] h-[480px]">
          <PercentRetentionUserChart data={data?.userRetention} />
        </div>
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-full md:w-[50%] p-[10px] h-[480px]">
          <TotalTimeUserPlayChart data={data?.engagementChartData || []} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default Retention