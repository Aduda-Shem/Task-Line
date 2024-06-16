import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TaskCompletionPieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <Card
      title="Task Completion Rate"
      bordered={false}
      style={{
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        background: '#ffffff',
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TaskCompletionPieChart;
