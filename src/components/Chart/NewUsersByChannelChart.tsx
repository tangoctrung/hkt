import { Card } from 'antd';
import BarChart from '../Chart/BarChart';

export default function NewUsersByChannelChart() {
    return (
        <Card title="New users by channel" className='h-[400px]'>
            <BarChart dataKey="channel" />
        </Card>
    );
}