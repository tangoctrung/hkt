import { Card, Table } from 'antd';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { convertNameCountry } from '../../../utils';
import EmptyData from '../../common/EmptyData';

export default function ActiveUsersByCountryChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {
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
        },
    ];
    let dataTable: any[] = [];
    const dataMap: Record<string, number> = {};

    if (data && data?.length > 0) {
        dataTable = data?.map(item => ({
            ...item,
            countryCode: convertNameCountry(item?.country),
            users: item?.count || 0
        }))
        dataTable.sort((x, y) => y?.count - x?.count);
        dataTable.forEach(item => {
            dataMap[item.countryCode] = item.users || 0;
        });
    }

    return (
        <Card title="Active users by Country" className='h-[480px] w-full shadow-md'>
            {data && data?.length > 0 &&
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-[66%] h-[316px] bg-white rounded-md shadow-sm overflow-hidden">
                        <VectorMap
                            map={worldMill}
                            backgroundColor="#ffffff"
                            zoomOnScroll={false}
                            className='h-full'
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
                    <div className="w-full md:w-[33%] max-h-[380px] overflow-scroll viewScroll">
                        <Table
                            dataSource={dataTable}
                            columns={columns}
                            pagination={false}
                            rowKey="country"
                            size="small"
                        />
                    </div>
                </div>}
            {!data && <EmptyData type='' />}
        </Card>
    );
}