import { Card } from 'antd';
import LineRoundChart from '../../Chart/LineRoundChart';

export default function UserRetentionChart() {
    return (
        <Card title="User retention" className='h-full' bodyStyle={{ height: "350px" }}>
            <LineRoundChart />
        </Card>
    );
}