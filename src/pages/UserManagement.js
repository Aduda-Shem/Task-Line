import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser, addDepartment, moveEmployee, removeEmployee } from '../redux/actions/userActions';
import { Typography, Button, Modal, Form, Input, Select, Table, Space, Avatar, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, UserDeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const departments = useSelector(state => state.users.departments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDepartmentModalVisible, setIsDepartmentModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [departmentForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(updateUser({ ...selectedUser, ...values }));
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDepartmentOk = () => {
    departmentForm.validateFields().then((values) => {
      dispatch(addDepartment({ id: Date.now(), ...values }));
      setIsDepartmentModalVisible(false);
      departmentForm.resetFields();
    });
  };

  const handleDepartmentCancel = () => {
    setIsDepartmentModalVisible(false);
    departmentForm.resetFields();
  };

  const handleMoveEmployee = (userId, departmentId) => {
    dispatch(moveEmployee(userId, departmentId));
  };

  const handleRemoveEmployee = (userId) => {
    dispatch(removeEmployee(userId));
  };

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
      render: (name, record, index) => `${index + 1}. ${name}`
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
          onChange={(value) => handleMoveEmployee(user.id, value)}
        >
          {departments.map(dept => (
            <Option key={dept.id} value={dept.id}>{dept.name}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={role ? (role === 'manager' ? 'blue' : 'green') : 'default'}>{role ? role.toUpperCase() : ''}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditUser(user)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user.id)} />
          <Button icon={<UserDeleteOutlined />} onClick={() => handleRemoveEmployee(user.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '10px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDepartmentModalVisible(true)}
        >
          Add Department
        </Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title="Edit User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select the role!' }]}>
            <Select>
              <Option value="employee">Employee</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Add Department" visible={isDepartmentModalVisible} onOk={handleDepartmentOk} onCancel={handleDepartmentCancel}>
        <Form form={departmentForm} layout="vertical">
          <Form.Item label="Department Name" name="name" rules={[{ required: true, message: 'Please input the department name!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
