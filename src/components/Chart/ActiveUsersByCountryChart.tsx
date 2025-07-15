import { Card, Table } from 'antd';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { mockActiveUsersByCountry } from '../../utils/data/countryActiveUsers';

export default function ActiveUsersByCountryChart() {
    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Active Users',
            dataIndex: 'users',
            key: 'users',
            render: (value: number, record: any) => (
                <span>
                    {value}{" "}
                    <span className={record.change >= 0 ? "text-green-600" : "text-red-600"}>
                        {record.change >= 0 ? `▲ ${record.change}%` : `▼ ${Math.abs(record.change)}%`}
                    </span>
                </span>
            )
        },
    ];

    const dataMap: Record<string, number> = {};
    mockActiveUsersByCountry.forEach(item => {
        dataMap[item.countryCode] = item.users;
    });

    return (
        <Card title="Active users by Country" className='h-[400px]'>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-h-[400px] bg-white rounded-md shadow-sm overflow-hidden">
                    <VectorMap
                        map={worldMill}
                        backgroundColor="#ffffff"
                        zoomOnScroll={false}
                        regionStyle={{
                            initial: {
                                fill: '#e4e4e4',
                                fillOpacity: 1,
                                stroke: 'none',
                                strokeWidth: 0,
                                strokeOpacity: 1,
                            },
                            selected: {
                                fill: '#1d4ed8',
                            },
                        }}
                        series={{
                            regions: [
                                {
                                    attribute: 'fill',
                                    values: dataMap,
                                    scale: ['#dbeafe', '#1d4ed8'],
                                    normalizeFunction: 'polynomial',
                                },
                            ],
                        }}
                    />
                </div>
                <div className="flex-1">
                    <Table
                        dataSource={mockActiveUsersByCountry}
                        columns={columns}
                        pagination={false}
                        rowKey="country"
                        size="small"
                    />
                </div>
            </div>
        </Card>
    );
}