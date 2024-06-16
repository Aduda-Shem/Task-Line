import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TasksByDepartmentBarChart = ({ data }) => (
  <Card
    title="Tasks by Department"
    bordered={false}
    style={{
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      background: '#ffffff',
    }}
  >
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" stackId="a" fill="#0088FE" />
        <Bar dataKey="pending" stackId="a" fill="#FFBB28" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default TasksByDepartmentBarChart;
