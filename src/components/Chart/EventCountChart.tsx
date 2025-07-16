import { Card } from 'antd';
import BarChart from '../Chart/BarChart';

export default function EventCountChart() {
    return (
        <Card title="Event count by event name" className='h-[480px]'>
            <div className='w-full h-[400px] flex justify-center items-center'>
                <BarChart dataKey="event" />
            </div>
        </Card>
    );
}