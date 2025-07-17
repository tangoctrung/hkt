import React, { useEffect, useState } from 'react'
import ActiveUsersByCountryChart from '../../components/Dasboard/Components/ActiveUsersByCountryChart';
import NumberGenderUserChart from '../../components/ReportUser/NumberGenderUserChart';
import NumberUserCityChart from '../../components/ReportUser/NumberUserCityChart';
import NumberUserLanguage from '../../components/ReportUser/NumberUserLanguage';
import NumberUserNewAndOldChart from '../../components/ReportUser/NumberUserNewAndOldChart';
import NumberUserAgeChart from '../../components/ReportUser/NumberUserAgeChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';
import { Dayjs } from 'dayjs'
import { defaultRange } from '../../constant'
import { getDataSummaryService } from '../../endpoint/user/userService'

function ReportUser() {

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
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-full md:w-[70%] p-[10px] overflow-hidden h-[480px]">
          <NumberUserNewAndOldChart />
        </div>
        <div className="w-full md:w-[30%] p-[10px] overflow-hidden h-[480px]">
          <NumberGenderUserChart />
        </div>
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-full md:w-[50%] p-[10px] overflow-hidden h-[400px]">
          <NumberUserCityChart />
        </div>
        <div className="w-full md:w-[50%] p-[10px] overflow-hidden h-[400px]">
          <NumberUserLanguage />
        </div>
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className='w-full md:w-[70%]'>
          <ActiveUsersByCountryChart />
        </div>
        <div className='w-full md:w-[30%]'>
          <NumberUserAgeChart />
        </div>
      </div>
    </div>
  )
}

export default ReportUser