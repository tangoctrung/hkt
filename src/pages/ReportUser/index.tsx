import React from 'react'
import ActiveUsersByCountryChart from '../../components/Dasboard/Components/ActiveUsersByCountryChart';
import NumberGenderUserChart from '../../components/ReportUser/NumberGenderUserChart';
import NumberUserCityChart from '../../components/ReportUser/NumberUserCityChart';
import NumberUserLanguage from '../../components/ReportUser/NumberUserLanguage';
import NumberUserNewAndOldChart from '../../components/ReportUser/NumberUserNewAndOldChart';
import NumberUserAgeChart from '../../components/ReportUser/NumberUserAgeChart';

function ReportUser() {
  return (
    <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-[70%] p-[10px] overflow-hidden h-[480px]">
          <NumberUserNewAndOldChart />
        </div>
        <div className="w-[30%] p-[10px] overflow-hidden h-[480px]">
          <NumberGenderUserChart />
        </div>
      </div>
      <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
        <div className="w-[50%] p-[10px] overflow-hidden h-[400px]">
          <NumberUserCityChart />
        </div>
        <div className="w-[50%] p-[10px] overflow-hidden h-[400px]">
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