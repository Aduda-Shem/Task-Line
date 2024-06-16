import React from 'react';
import { Table, Button, Avatar, Select, Space, Tag } from 'antd';
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import DeletePopup from '../DeletePopup';

const { Option } = Select;

const UserTable = ({ users, departments, onEditUser, onDeleteUser, onMoveEmployee, onRemoveEmployee }) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'email',
      key: 'avatar',
      render: (email) => <Avatar src={`https://i.pravatar.cc/150?u=${email}`} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record, index) => `${index + 1}. ${name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => `${address.street}, ${address.city}`,
    },
    {
      title: 'Department',
      dataIndex: 'departmentId',
      key: 'departmentId',
      render: (departmentId, user) => (
        <Select
          defaultValue={departmentId || 'Move to Department'}
          onChange={(value) => onMoveEmployee(user.id, value)}
          style={{ width: '100%' }}
        >
          {departments.map((dept) => (
            <Option key={dept.id} value={dept.id}>
              {dept.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role ? (role === 'manager' ? 'blue' : 'green') : 'default'}>
          {role ? role.toUpperCase() : ''}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEditUser(user)} />
          <Button icon={<UserDeleteOutlined />} onClick={() => onRemoveEmployee(user.id)} />
          <DeletePopup onConfirm={() => onDeleteUser(user.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
    />
  );
};

export default UserTable;
