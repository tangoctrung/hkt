import { Card, Table } from 'antd';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { getDataSummaryService } from '../../endpoint/user/userService';
import EmptyData from '../common/EmptyData';
import { formatNumberEN } from '../../utils';

const columns = [
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Active Users', dataIndex: 'users', key: 'users' },
];

export default function RealtimeActiveUsers({
    lastDay,
}: {
    lastDay: Dayjs
}) {

    const [data, setData] = useState<any>()
    useEffect(() => {
        async function getDataSummaryLastDay() {
            let fromDate: string = lastDay.format("YYYY-MM-DD")
            const { success, data } = await getDataSummaryService({
                fromDate,
                toDate: fromDate
            })
            if (success) {
                setData(data)
            }
        }
        getDataSummaryLastDay();
    }, [lastDay])

    const totalUsers = data?.topCountries?.reduce((sum: number, item: any) => sum + item.count, 0);
    let dataTable: any[] = [];
    if (data?.topCountries && data?.topCountries?.length > 0) {
        dataTable = data?.topCountries?.map((item: any) => ({
            ...item,
            users: formatNumberEN(item?.count) || 0
        }))
        dataTable.sort((x, y) => y?.count - x?.count);
    }

    return (
        <Card title="Active Users in last day" className="bg-white p-4 rounded shadow-md h-[400px]">
            {data &&
                <>
                    <p className="text-2xl font-bold mb-4">{formatNumberEN(totalUsers)}</p>
                    <div className='max-h-[240px] overflow-y-scroll viewScroll'>
                        <Table dataSource={dataTable} columns={columns} pagination={false} size="small" />
                    </div>
                </>}
            {!data && <EmptyData type='' />}
        </Card>
    );
}