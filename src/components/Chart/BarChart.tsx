import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CustomBarChart({ dataKey, dataPrimary }: { dataKey: string, dataPrimary?: any }) {
    const data = dataPrimary || [
        { name: 'Direct', value: 240000 },
        { name: 'Referral', value: 80000 },
        { name: 'Organic', value: 20000 },
    ];

    const setWidthBar = () => {
        if (!dataPrimary) return 0
        if (dataPrimary?.length <= 5) return 50
        if (dataPrimary?.length >= 5 && dataPrimary?.length <= 10) return 40
        if (dataPrimary?.length >= 11 && dataPrimary?.length <= 15) return 20
        if (dataPrimary?.length >= 16) return 20
    }

    return (
        <ResponsiveContainer width="80%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis
                    tickFormatter={(value) => {
                        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
                        if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
                        return value.toString();
                    }}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#1677ff" barSize={setWidthBar()} />
            </BarChart>
        </ResponsiveContainer>
    );
}