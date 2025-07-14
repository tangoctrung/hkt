import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CustomBarChart({ dataKey }: { dataKey: string }) {
    const data = [
        { name: 'Direct', value: 240000 },
        { name: 'Referral', value: 80000 },
        { name: 'Organic', value: 20000 },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1677ff" />
            </BarChart>
        </ResponsiveContainer>
    );
}