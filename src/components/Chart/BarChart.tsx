import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CustomBarChart({ dataKey, dataPrimary }: { dataKey: string, dataPrimary?: any }) {
    const data = dataPrimary || [
        { name: 'Direct', value: 240000 },
        { name: 'Referral', value: 80000 },
        { name: 'Organic', value: 20000 },
    ];

    return (
        <ResponsiveContainer width="80%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1677ff" barSize={50} />
            </BarChart>
        </ResponsiveContainer>
    );
}