import { Table } from 'antd';

const dataSource = [
    { key: '1', country: 'Bangladesh', users: 4 },
    { key: '2', country: 'Germany', users: 1 },
    { key: '3', country: 'Gibraltar', users: 1 },
    { key: '4', country: 'Guyana', users: 1 },
];

const columns = [
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Active Users', dataIndex: 'users', key: 'users' },
];

export default function RealtimeActiveUsers() {
    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <h3 className="font-semibold mb-2">Active Users in last day</h3>
            <p className="text-2xl mb-4">12</p>
            <Table dataSource={dataSource} columns={columns} pagination={false} size="small" />
        </div>
    );
}