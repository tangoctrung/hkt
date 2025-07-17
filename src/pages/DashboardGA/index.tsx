import OverviewCards from '../../components/Dasboard/OverviewCards';
import ActiveUserLineChart from '../../components/Dasboard/ActiveUserLineChart';
import RealtimeActiveUsers from '../../components/Dasboard/RealtimeActiveUsers';
import SuggestedSection from '../../components/Dasboard/SuggestedSection';
import EventCountChart from '../../components/Chart/EventCountChart';
import ActiveUsersByCountryChart from '../../components/Dasboard/Components/ActiveUsersByCountryChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { defaultRange } from '../../constant';
import { getDataSummaryService } from '../../endpoint/user/userService';

export default function DashboardGA() {

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
            <OverviewCards />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 h-full">
                    <ActiveUserLineChart />
                </div>
                <div className='h-full'>
                    <RealtimeActiveUsers />
                </div>
            </div>
            <div className="mt-4 w-full overflow-y-hidden">
                <SuggestedSection />
            </div>
            <div className='mt-4 w-full gap-6 flex flex-col md:flex-row'>
                <div className='w-full md:w-[70%]'>
                    <ActiveUsersByCountryChart />
                </div>
                <div className='w-full md:w-[30%]'>
                    <EventCountChart />
                </div>
            </div>
        </div>
    );
}