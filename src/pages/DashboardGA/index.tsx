import OverviewCards from '../../components/Dasboard/OverviewCards';
import ActiveUserLineChart from '../../components/Dasboard/ActiveUserLineChart';
import RealtimeActiveUsers from '../../components/Dasboard/RealtimeActiveUsers';
import SuggestedSection from '../../components/Dasboard/SuggestedSection';
import EventCountChart from '../../components/Chart/EventCountChart';

export default function DashboardGA() {
    return (
        <div className="p-4 space-y-6">
            <OverviewCards />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                    <ActiveUserLineChart />
                </div>
                <div>
                    <RealtimeActiveUsers />
                </div>
                <div>
                    <EventCountChart />
                </div>
            </div>
            <div className="mt-4">
                <SuggestedSection />
            </div>
        </div>
    );
}