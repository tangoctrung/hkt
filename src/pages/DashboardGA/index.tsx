import OverviewCards from '../../components/Dasboard/OverviewCards';
import ActiveUserLineChart from '../../components/Dasboard/ActiveUserLineChart';
import RealtimeActiveUsers from '../../components/Dasboard/RealtimeActiveUsers';
import SuggestedSection from '../../components/Dasboard/SuggestedSection';

export default function DashboardGA() {
    return (
        <div className="p-4 space-y-6 w-full h-full overflow-x-hidden overflow-y-scroll viewScroll">
            <OverviewCards />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                    <ActiveUserLineChart />
                </div>
                <div>
                    <RealtimeActiveUsers />
                </div>
            </div>
            <div className="mt-4 w-full overflow-y-hidden">
                <SuggestedSection />
            </div>
        </div>
    );
}