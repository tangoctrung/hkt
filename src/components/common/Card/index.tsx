import { Card } from 'antd';

export default function CustomCard({ children, title }: {
  children?: any;
  title?: string;
}) {
  return (
    <Card
      title={title}
      style={{
        border: '1px solid #66656380',
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      {children}
    </Card>
  );
}
