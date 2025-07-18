import { Card } from 'antd';
import LineRoundChart from '../../Chart/LineRoundChart';

export default function RetentionByCohortChart() {
    return (
        <Card title="User retention by cohort" className='h-full' bodyStyle={{ height: "350px" }}>
            <LineRoundChart />
        </Card>
    );
}