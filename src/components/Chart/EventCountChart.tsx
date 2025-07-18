import { Card } from 'antd';
import BarChart from '../Chart/BarChart';

export default function EventCountChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {

    const dataPrimary = data?.map(({ event, count }) => ({
        name: event,
        value: count
    }))

    return (
        <Card title="Event count by event name" className='h-[480px]'>
            <div className='w-full h-[400px] flex justify-center items-center'>
                <BarChart dataKey="event" dataPrimary={dataPrimary} />
            </div>
        </Card>
    );
}