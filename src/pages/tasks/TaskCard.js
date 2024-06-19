import React from 'react';
import { Card, Tag, Col } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import DeletePopup from '../DeletePopup';

const TaskCard = ({ task, users, handleEditTask, handleDeleteTask, handleCompleteTask }) => {
  const userName = users.find(user => user.id === task.userId)?.name;

  return (
    <Col span={6}>
      <Card
        title={task.title}
        style={{
          marginBottom: '40px',
          background: '#ffffff',
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
        }}
        actions={[
          <EditOutlined key="edit" onClick={() => handleEditTask(task)} />,
          <DeletePopup key="delete" onConfirm={() => handleDeleteTask(task.id)} />,
          !task.completed && <CheckOutlined key="complete" onClick={() => handleCompleteTask(task.id)} />,
        ]}
      >
        <div style={{ overflowY: 'auto', paddingRight: '10px' }}>
          <p style={{ 
            marginBottom: '8px', 
            fontWeight: 'bold', 
            fontSize: '16px' }}
            >User: {userName}
          </p>
          <Tag color={task.completed ? 'green' : 'red'} 
          style={{ alignSelf: 'flex-start' }}>
            {task.completed ? 'Completed' : 'Pending'}
          </Tag>
        </div>
      </Card>
    </Col>
  );
};

export default TaskCard;
