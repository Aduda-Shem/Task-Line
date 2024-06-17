import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TasksByDepartmentBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
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
        <p>No data available</p>
      </Card>
    );
  }

  return (
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
          <Bar dataKey="completed" fill="#0088FE" />
          <Bar dataKey="pending" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

TasksByDepartmentBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number,
      completed: PropTypes.number,
      pending: PropTypes.number,
    })
  ).isRequired,
};

export default TasksByDepartmentBarChart;
