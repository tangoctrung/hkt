import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function LineRoundChart({ dataPrimary }: {
  dataPrimary?: any[]
}) {

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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={400}
        data={data}
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
        <Line type="monotone" dataKey="oldUser" stroke="#0088FE" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="newUser" stroke="#FFBB28" />
      </LineChart>
    </ResponsiveContainer>
  );
}
