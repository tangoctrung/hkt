import { Card } from 'antd';
import CustomBarChart from '../../Chart/BarChart';

export default function NewUsersByChannelChart() {
    return (
        <Card title="New users by channel" className='h-[400px]'>
            <CustomBarChart dataKey="channel" />
        </Card>
    );
}