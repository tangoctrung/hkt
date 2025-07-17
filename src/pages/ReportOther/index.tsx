import React, { useEffect, useState } from 'react'
import NumberUserActivePlatform from '../../components/ReportOther/NumberUserActivePlatform'
import NumberOSUserChart from '../../components/ReportOther/NumberOSUserChart'
import NumberCategoryDeviceChart from '../../components/ReportOther/NumberCategoryDeviceChart'
import NumberUserActiveBrower from '../../components/ReportOther/NumberUserActiveBrower'
import TimePickerCustom from '../../components/common/TimePickerCustom'
import { Dayjs } from 'dayjs'
import { defaultRange } from '../../constant'
import { getDataSummaryService } from '../../endpoint/user/userService'

function ReportOther() {
  const [rangeValue, setRangeValue] = useState<[Dayjs, Dayjs]>(defaultRange)

  useEffect(() => {
    async function getDataSummary() {
      let fromDate: string = rangeValue[0].format("YYYY-MM-DD")
      let toDate: string = rangeValue[1].format("YYYY-MM-DD")
      const { success, data } = await getDataSummaryService({
        fromDate,
        toDate
      })
      console.log({ success, data });
    }
    getDataSummary();
  }, [rangeValue])

  return (
    <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
      <div className='w-full flex justify-end'>
        <TimePickerCustom rangeValue={rangeValue} setRangeValue={setRangeValue} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <NumberUserActivePlatform />
        </div>
        <div className="md:col-span-8">
          <NumberOSUserChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <NumberUserActiveBrower />
        </div>
        <div className="md:col-span-4">
          <NumberCategoryDeviceChart />
        </div>
      </div>
    </div>
  )
}

export default ReportOther