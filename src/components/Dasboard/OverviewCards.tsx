import { Card, Skeleton } from 'antd';
import { formatTimeNumber } from '../../utils';
import CountUp from '../common/CountUp';

export default function OverviewCards({
    data,
    loading
}: {
    data: any;
    loading?: boolean;
}) {

    const totalEvent = data?.eventSummary?.reduce((sum: number, item: any) => sum + item?.count, 0)
    const stats = [
        { type: "number", title: 'Active users', value: data?.activeUsers },
        { type: "number", title: 'Event count', value: totalEvent },
        { type: "number", title: 'New users', value: data?.newUsers },
        { type: "string", title: 'Average interaction time', value: formatTimeNumber(data?.avgEngagementTimeSec) },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data && stats.map((s) => (
                <Card key={s.title} className='shadow-md'>
                    <p className="text-gray-500">{s.title}</p>
                    {s?.type === "number" ?
                        <CountUp target={s?.value || 0} duration={1000} className="text-xl font-semibold" /> :
                        <p className="text-xl font-semibold">{s.value}</p>}
                </Card>
            ))}
            {!data &&
                <>
                    <Skeleton.Button block={true} className='!h-24 !w-full' />
                    <Skeleton.Button block={true} className='!h-24 !w-full' />
                    <Skeleton.Button block={true} className='!h-24 !w-full' />
                    <Skeleton.Button block={true} className='!h-24 !w-full' />
                </>}
        </div>
    );
}