import { Card } from 'antd';
import CustomBarChart from '../../Chart/BarChart';

export default function NewUsersByChannelChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {

    const dataPrimary = data?.map(({ channel, count }) => ({
        name: channel,
        value: count
    }))

    return (
        <Card title="New users by channel" className='h-full'>
            <div className='w-full flex justify-center'>
                <CustomBarChart dataKey="channel" dataPrimary={dataPrimary} />
            </div>
        </Card>
    );
}