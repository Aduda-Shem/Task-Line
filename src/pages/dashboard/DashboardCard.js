import React from 'react';
import { Card } from 'antd';
import { ShoppingOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const DashboardCard = ({ title, icon, value }) => (
  <Card
    title={title}
    bordered={false}
    style={{
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      background: '#ffffff',
    }}
  >
    {icon}
    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{value}</p>
  </Card>
);

const iconComponents = {
  total: <ShoppingOutlined style={{ fontSize: '40px', color: '#08c' }} />,
  completed: <CheckCircleOutlined style={{ fontSize: '40px', color: '#52c41a' }} />,
  pending: <ClockCircleOutlined style={{ fontSize: '40px', color: '#faad14' }} />,
  employees: <UserOutlined style={{ fontSize: '40px', color: '#08c' }} />,
};

export const TaskCard = ({ title, value }) => (
  <DashboardCard title={title} icon={iconComponents[title.toLowerCase()]} value={value} />
);

export const TotalTasksCard = ({ value }) => (
  <DashboardCard title="Total Tasks" icon={iconComponents.total} value={value} />
);

export const CompletedTasksCard = ({ value }) => (
  <DashboardCard title="Completed Tasks" icon={iconComponents.completed} value={value} />
);

export const PendingTasksCard = ({ value }) => (
  <DashboardCard title="Pending Tasks" icon={iconComponents.pending} value={value} />
);

export const TotalEmployeesCard = ({ value }) => (
  <DashboardCard title="Total Employees" icon={iconComponents.employees} value={value} />
);
