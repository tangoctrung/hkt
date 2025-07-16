import { Card } from 'antd';

const stats = [
    { title: 'Active users', value: '2.2M' },
    { title: 'Event count', value: '23M' },
    { title: 'New users', value: '4.2M' },
    { title: 'Key events', value: '124K' },
];

export default function OverviewCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
                <Card key={s.title} className='shadow-md'>
                    <p className="text-gray-500">{s.title}</p>
                    <p className="text-xl font-semibold">{s.value}</p>
                </Card>
            ))}
        </div>
    );
}