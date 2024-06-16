import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import {
  TotalTasksCard,
  CompletedTasksCard,
  PendingTasksCard,
  TotalEmployeesCard,
} from './DashboardCard';
import TaskCompletionPieChart from './TaskCompletionPieChart';
import TasksByDepartmentBarChart from './TasksByDepartmentBarChart';
import DepartmentsTable from './DepartmentsTable';
import TaskFilter from './TaskFilter';
import BreadcrumbComponent from '../BreadCrumb';

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const users = useSelector(state => state.users.users);
  const departments = useSelector(state => state.users.departments);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilterChange = (type, value) => {
    let filtered = tasks;

    if (type === 'department' && value) {
      filtered = filtered.filter(task => task.departmentId === value);
    }
    if (type === 'status' && value) {
      filtered = filtered.filter(task => (value === 'completed' ? task.completed : !task.completed));
    }
    if (type === 'search' && value) {
      filtered = filtered.filter(task => task.title.toLowerCase().includes(value.toLowerCase()));
    }

    setFilteredTasks(filtered);
  };

  const completedTasks = filteredTasks.filter(task => task.completed);
  const pendingTasks = filteredTasks.filter(task => !task.completed);

  const pieData = [
    { name: 'Completed', value: completedTasks.length },
    { name: 'Pending', value: pendingTasks.length },
  ];

  const departmentTaskData = departments.map(dept => {
    const deptTasks = filteredTasks.filter(task => task.userId === dept.id);
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
    <div style={{ padding: '10px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <BreadcrumbComponent title="Home" breadcrumbItem="Dashboard" link="/taskboard" />
      <TaskFilter onFilterChange={handleFilterChange} departments={departments} />
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <TotalTasksCard value={tasks.length} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <CompletedTasksCard value={completedTasks.length} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <PendingTasksCard value={pendingTasks.length} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <TotalEmployeesCard value={users.length} />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        <Col xs={24} md={12}>
          <TaskCompletionPieChart data={pieData} />
        </Col>
        <Col xs={24} md={12}>
          <TasksByDepartmentBarChart data={departmentTaskData} />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        <Col span={24}>
          <DepartmentsTable data={departmentTaskData} columns={columns} />
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;
