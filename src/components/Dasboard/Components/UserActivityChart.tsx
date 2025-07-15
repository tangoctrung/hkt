import { Card } from 'antd';
import LineChart from '../../Chart/LineChart';

export default function UserActivityChart() {
    return (
        <Card title="User activity over time" className='h-[400px]' bodyStyle={{ height: "350px" }}>
            <LineChart title='activity' />
        </Card>
    );
}