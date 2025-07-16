import { Card } from 'antd';
import LineChart from '../../Chart/LineChart';

export default function UserRetentionChart() {
    return (
        <Card title="User retention" className='h-[400px] shadow-md' bodyStyle={{ height: "350px" }}>
            <LineChart title="day" />
        </Card>
    );
}