import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const data = [
    { name: 'Oct', users: 0 },
    { name: 'Jan', users: 0 },
    { name: 'Apr', users: 200000 },
    { name: 'Jul', users: 600000 },
];

export default function ActiveUserLineChart() {
    return (
        <div className="bg-white p-4 mt-4 rounded shadow">
            <h3 className="text-md font-semibold mb-4">Last 12 months</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}