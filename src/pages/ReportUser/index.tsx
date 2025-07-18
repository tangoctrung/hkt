import React, { useEffect, useState } from 'react'
import ActiveUsersByCountryChart from '../../components/Dasboard/Components/ActiveUsersByCountryChart';
import NumberGenderUserChart from '../../components/ReportUser/NumberGenderUserChart';
import NumberUserLanguage from '../../components/ReportUser/NumberUserLanguage';
import NumberUserNewAndOldChart from '../../components/ReportUser/NumberUserNewAndOldChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';
import { Dayjs } from 'dayjs'
import { defaultRange } from '../../constant'
import { getDataSummaryService } from '../../endpoint/user/userService'
import Loading from '../../components/common/Loading';

function ReportUser() {
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
      <div className='mt-4 w-full flex flex-col md:flex-row'>
        <div className="w-full md:w-[70%] p-[10px] overflow-hidden h-[500px]">
          <NumberUserNewAndOldChart data={data?.chartData} />
        </div>
        <div className="w-full md:w-[30%] p-[10px] overflow-hidden h-[500px]">
          <NumberGenderUserChart data={data?.userGender} />
        </div>
      </div>
      <div className='mt-4 w-full flex flex-col md:flex-row justify-center'>
        <div className="w-full md:w-[70%] p-[10px] overflow-hidden ">
          <NumberUserLanguage data={data?.userLanguage} />
        </div>

      </div>
      <div className='mt-4 w-full flex flex-col md:flex-row justify-center'>
        <div className='w-full md:w-[70%] p-[10px]'>
          <ActiveUsersByCountryChart data={data?.topCountries} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default ReportUser