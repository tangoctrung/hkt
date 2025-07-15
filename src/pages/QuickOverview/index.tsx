import React from 'react'
import { DatePicker } from 'antd';
import LineChart from '../../components/Chart/LineChart';
import PieChart from '../../components/Chart/PieChartDevice';
import DoughnutChart from '../../components/Chart/DoughnutChart';

const { RangePicker } = DatePicker;

function QuickOverview() {
  return (
    <div className='w-full h-full overflow-y-scroll viewScroll'>
      <div>
        <RangePicker picker='month' />
      </div>
      <div className='lineChart'>
        <LineChart title='Biểu đồ hành động người dùng' />
      </div>
      <div className='flex justify-between items-center mt-20 pt-10 border-t-[2px] border-t-gray-300'>
        <div className='w-[45%]'>
          <h3 className='w-full text-center mt-4'>Thống kê người dùng mới và cũ</h3>
          <PieChart />
        </div>
        <div className='w-[45%]'>
          <h3 className='w-full text-center mt-4'>Thống kê kết quả chơi</h3>
          <DoughnutChart />
        </div>
      </div>
    </div>
  )
}

export default QuickOverview