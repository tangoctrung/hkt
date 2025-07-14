import { Card } from 'antd';
import BarChart from '../Chart/BarChart';

export default function EventCountChart() {
    return (
        <Card title="Event count by event name" className='h-[400px]'>
            <BarChart dataKey="event" />
        </Card>
    );
}