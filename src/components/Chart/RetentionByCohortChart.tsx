import { Card } from 'antd';
import LineChart from '../Chart/LineChart';

export default function RetentionByCohortChart() {
    return (
        <Card title="User retention by cohort" className='h-[400px]'>
            <LineChart title='day1' />
        </Card>
    );
}