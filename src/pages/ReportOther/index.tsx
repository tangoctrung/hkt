import React, { useEffect, useState } from 'react'
import NumberUserActivePlatform from '../../components/ReportOther/NumberUserActivePlatform'
import NumberOSUserChart from '../../components/ReportOther/NumberOSUserChart'
import NumberCategoryDeviceChart from '../../components/ReportOther/NumberCategoryDeviceChart'
import NumberUserActiveBrower from '../../components/ReportOther/NumberUserActiveBrower'
import TimePickerCustom from '../../components/common/TimePickerCustom'
import { Dayjs } from 'dayjs'
import { defaultRange } from '../../constant'
import { getDataSummaryService } from '../../endpoint/user/userService'
import Loading from '../../components/common/Loading'

function ReportOther() {
  const [rangeValue, setRangeValue] = useState<[Dayjs, Dayjs]>(defaultRange)
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

  return (
    <div className="p-4 space-y-6 w-full">
      <div className='w-full flex justify-end'>
        <TimePickerCustom rangeValue={rangeValue} setRangeValue={setRangeValue} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <NumberUserActivePlatform data={data?.platformSummary || []} />
        </div>
        <div className="md:col-span-8">
          <NumberOSUserChart data={data?.osSummary || []} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <NumberUserActiveBrower data={data?.browserSummary || []} />
        </div>
        <div className="md:col-span-4">
          <NumberCategoryDeviceChart data={data?.deviceCategory || []} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default ReportOther