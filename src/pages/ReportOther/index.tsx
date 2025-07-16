import React from 'react'
import NumberUserActivePlatform from '../../components/ReportOther/NumberUserActivePlatform'
import NumberOSUserChart from '../../components/ReportOther/NumberOSUserChart'
import NumberCategoryDeviceChart from '../../components/ReportOther/NumberCategoryDeviceChart'
import NumberUserActiveBrower from '../../components/ReportOther/NumberUserActiveBrower'
import TimePickerCustom from '../../components/common/TimePickerCustom'

function ReportOther() {
  return (
    <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
      <div className='w-full flex justify-end'>
        <TimePickerCustom />
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