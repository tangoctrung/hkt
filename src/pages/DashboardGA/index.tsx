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
import Loading from '../../components/common/Loading';

export default function DashboardGA() {
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
            <OverviewCards data={data} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 h-full">
                    <ActiveUserLineChart data={data?.chartData || []} />
                </div>
                <div className='h-full'>
                    <RealtimeActiveUsers lastDay={rangeValue[1].subtract(1, 'day').startOf('day')} />
                </div>
            </div>
            <div className="w-full overflow-y-hidden">
                <SuggestedSection data={data} />
            </div>
            <div className='w-full gap-6 flex flex-col md:flex-row'>
                <div className='w-full md:w-[60%]'>
                    <ActiveUsersByCountryChart data={data?.topCountries} />
                </div>
                <div className='w-full md:w-[40%]'>
                    <EventCountChart data={data?.eventSummary || []} />
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
}