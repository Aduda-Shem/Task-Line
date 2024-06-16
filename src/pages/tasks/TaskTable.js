import React from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import DeletePopup from '../DeletePopup';

const TaskTable = ({ tasks, users, handleEditTask, handleDeleteTask, handleCompleteTask }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => users.find(user => user.id === userId)?.name,
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed) => (
        <Tag color={completed ? 'green' : 'red'}>
          {completed ? 'Completed' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, task) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditTask(task)} />
          <DeletePopup key="delete" onConfirm={() => handleDeleteTask(task.id)} /> 
          {!task.completed && <Button icon={<CheckOutlined />} onClick={() => handleCompleteTask(task.id)} />}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" pagination={true} />;
};

export default TaskTable;
