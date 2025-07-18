import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "antd";
import { formatTimeStringToDDMM } from "../../utils";

const dataExample = [
    { name: 'Oct', users: 0 },
    { name: 'Jan', users: 0 },
    { name: 'Apr', users: 200000 },
    { name: 'Jul', users: 600000 },
];

export default function ActiveUserLineChart({
    data,
    loading
}: {
    data: any[];
    loading?: boolean;
}) {

    const dataPrimary = data?.map(item => ({
        ...item,
        keyDate: formatTimeStringToDDMM(item?.date)
    }))
    return (
        <Card title="Users active" className="h-[400px] bg-white p-4 rounded shadow-md">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataPrimary || dataExample}>
                    <XAxis dataKey="keyDate" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="activeUsers"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
        const item = payload[0].payload;
        return (
            <div className="bg-white p-2 border rounded shadow">
                <p>{new Date(item.date).toDateString()}</p>
                {payload && payload?.map((item: any, index: number) => (
                    <p key={index}
                        style={{ color: item?.color }}>
                        {item?.dataKey}: {item?.payload[item?.dataKey]}
                    </p>
                ))}
            </div>
        );
    }

    return null;
};