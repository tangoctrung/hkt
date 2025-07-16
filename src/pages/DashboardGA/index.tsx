import OverviewCards from '../../components/Dasboard/OverviewCards';
import ActiveUserLineChart from '../../components/Dasboard/ActiveUserLineChart';
import RealtimeActiveUsers from '../../components/Dasboard/RealtimeActiveUsers';
import SuggestedSection from '../../components/Dasboard/SuggestedSection';
import EventCountChart from '../../components/Chart/EventCountChart';
import ActiveUsersByCountryChart from '../../components/Dasboard/Components/ActiveUsersByCountryChart';
import TimePickerCustom from '../../components/common/TimePickerCustom';

export default function DashboardGA() {
    return (
        <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
            <div className='w-full flex justify-end'>
                <TimePickerCustom />
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