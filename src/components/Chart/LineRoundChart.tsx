import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineRoundChart({ dataKey, dataPrimary }: {
  dataKey?: string[];
  dataPrimary?: any[]
}) {
  const colors = ["#0088FE", "#FFBB28"]
  const keys = dataKey || ["oldUser", "newUser"]
  const data = [
    {
      name: 'Tháng 1',
      newUser: 2000,
      oldUser: 400,
    },
    {
      name: 'Tháng 2',
      newUser: 1200,
      oldUser: 2400,
    },
    {
      name: 'Tháng 3',
      newUser: 2000,
      oldUser: 3600,
    },
    {
      name: 'Tháng 4',
      newUser: 2700,
      oldUser: 5600,
    },
    {
      name: 'Tháng 5',
      newUser: 1700,
      oldUser: 8300,
    },
    {
      name: 'Tháng 6',
      newUser: 2000,
      oldUser: 10000,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" key={"lineRoundChart"}>
      <LineChart
        key={"lineRoundChart"}
        dataKey={""}
        width={500}
        height={400}
        data={dataPrimary || data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys?.map((item: string, index: number) => (
          <Line type="monotone" dataKey={item} stroke={colors[index]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
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