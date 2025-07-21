import { Card } from 'antd';
import SimpleAreaChart from '../../Chart/SimpleAreaChart';

export default function UserRetentionChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {
    const firstCount = data?.[0]?.count || 1;
    const cohortDate = data?.[0]?.cohortDate || '';
    const dataPrimary = data?.map((item: any, index: number) => ({
        ...item,
        name: "Day " + (item?.returnDay - 1),
        value: index === 0 ? 100 : ((item?.count * 100) / firstCount).toFixed(2),
    }));
    return (
        <Card title="Users retention" className='h-full' bodyStyle={{ height: "350px" }}>
            <div className='h-[320px] flex justify-center'>
                <SimpleAreaChart dataPrimary={dataPrimary} unit='%' />
            </div>
            <div className='p-1 pl-10 justify-center text-center'>50 days start {cohortDate}</div>
        </Card>
    )
}