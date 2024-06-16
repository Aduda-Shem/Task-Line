import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TaskStats = ({ totalTasks, completedTasks, pendingTasks, onStatClick, activeStat }) => {
  return (
    <>
      <Title level={4}>Task Statistics</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            onClick={() => onStatClick('total')}
            style={{ cursor: 'pointer', backgroundColor: activeStat === 'total' ? '#e6f7ff' : '#fff' }}
          >
            <Statistic
              title="Total Tasks"
              value={totalTasks}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UnorderedListOutlined />}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            onClick={() => onStatClick('completed')}
            style={{ cursor: 'pointer', backgroundColor: activeStat === 'completed' ? '#e6f7ff' : '#fff' }}
          >
            <Statistic
              title="Completed Tasks"
              value={completedTasks}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            onClick={() => onStatClick('pending')}
            style={{ cursor: 'pointer', backgroundColor: activeStat === 'pending' ? '#e6f7ff' : '#fff' }}
          >
            <Statistic
              title="Pending Tasks"
              value={pendingTasks}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TaskStats;
