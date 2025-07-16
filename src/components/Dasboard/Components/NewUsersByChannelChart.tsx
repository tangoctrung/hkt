import { Card } from 'antd';
import CustomBarChart from '../../Chart/BarChart';

export default function NewUsersByChannelChart() {
    return (
        <Card title="New users by channel" className='h-[400px] shadow-md'>
            <div className='w-full flex justify-center'>
                <CustomBarChart dataKey="channel" />
            </div>
        </Card>
    );
}