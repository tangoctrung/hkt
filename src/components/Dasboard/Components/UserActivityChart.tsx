import { Card } from 'antd';
import LineRoundChart from '../../Chart/LineRoundChart';

export default function UserActivityChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {

    function groupByHourRange(data: any[], range = 3) {
        return Array.from({ length: 24 / range }, (_, i) => {
            const start = i * range;
            const hours = Array.from({ length: range }, (_, j) =>
                String((start + j) % 24).padStart(2, '0')
            );
            const total = data
                ?.filter(d => hours.includes(d.hour))
                ?.reduce((sum, d) => sum + d.count, 0);
            return { hour: `${hours[0]}-${Number(hours[range - 1]) + 1}h`, count: total };
        });
    }

    const dataConvert = groupByHourRange(data)
    const dataKey = ["users"]
    const dataPrimary = dataConvert?.map(item => ({
        ...item,
        name: item?.hour,
        users: item?.count
    }))

    return (
        <Card title="User activity over time" className='h-full' bodyStyle={{ height: "350px" }}>
            <LineRoundChart dataKey={dataKey} dataPrimary={dataPrimary} typeTooltip="nocustom" />
        </Card>
    );
}