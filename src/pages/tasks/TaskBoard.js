import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/actions/taskActions';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import { Button, Col, Row } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import BreadcrumbComponent from '../BreadCrumb';

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const [activeStat, setActiveStat] = useState('total');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const handleStatClick = (type) => {
    setFilter(type);
    setActiveStat(type);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <BreadcrumbComponent title="Home" breadcrumbItem="Tasks" link="/dashboard" />
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <TaskStats
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
            onStatClick={handleStatClick}
            activeStat={activeStat}
          />
        </Col>
        <Col span={20}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
            <Col>
              <Button
                type={view === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setView('list')}
                style={{ marginRight: '8px' }}
              >
                List View
              </Button>
              <Button
                type={view === 'board' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setView('board')}
              >
                Board View
              </Button>
            </Col>
          </Row>
          <TaskList view={view} filter={filter} />
        </Col>
      </Row>
    </div>
  );
};

export default TaskBoard;
