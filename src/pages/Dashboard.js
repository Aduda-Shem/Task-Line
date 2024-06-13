import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Row, Col, Card, Table } from 'antd';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingOutlined, CheckCircleOutlined, ClockCircleOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const users = useSelector(state => state.users.users);
  const departments = useSelector(state => state.users.departments);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const COLORS = ['#0088FE', '#FFBB28'];
  const data = [
    { name: 'Completed', value: completedTasks.length },
    { name: 'Pending', value: pendingTasks.length },
  ];

  const departmentTaskData = departments.map(dept => {
    const deptTasks = tasks.filter(task => task.userId === dept.id);
    return {
      name: dept.name,
      total: deptTasks.length,
      completed: deptTasks.filter(task => task.completed).length,
      pending: deptTasks.filter(task => !task.completed).length,
    };
  });

  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Tasks',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Completed Tasks',
      dataIndex: 'completed',
      key: 'completed',
    },
    {
      title: 'Pending Tasks',
      dataIndex: 'pending',
      key: 'pending',
    },
  ];

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Total Tasks"
            bordered={false}
            style={{
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
          >
            <ShoppingOutlined style={{ fontSize: '40px', color: '#08c' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{tasks.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Completed Tasks"
            bordered={false}
            style={{
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
          >
            <CheckCircleOutlined style={{ fontSize: '40px', color: '#52c41a' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{completedTasks.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Pending Tasks"
            bordered={false}
            style={{
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
          >
            <ClockCircleOutlined style={{ fontSize: '40px', color: '#faad14' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{pendingTasks.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Total Employees"
            bordered={false}
            style={{
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
          >
            <UserOutlined style={{ fontSize: '40px', color: '#08c' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{users.length}</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        <Col xs={24} md={12}>
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
        </Col>
        <Col xs={24} md={12}>
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
              <BarChart data={departmentTaskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        <Col span={24}>
          <Card
            title="Departments"
            bordered={false}
            style={{
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
          >
            <Table dataSource={departmentTaskData} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
