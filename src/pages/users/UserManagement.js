import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUsers } from '../../hooks/useUsers';
import UserTable from './UserTable';
import UserModal from './UserModal';
import DepartmentModal from './DepartmentModal';
import AddUserDrawer from './AddUserDrawer';
import Breadcrumb from '../BreadCrumb';

const UserManagement = () => {
  const { users, departments, addUser, updateUser, deleteUser, addDepartment, moveEmployee, removeEmployee } = useUsers();
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isDepartmentModalVisible, setIsDepartmentModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm] = Form.useForm();
  const [departmentForm] = Form.useForm();
  const [drawerForm] = Form.useForm();

  // this is the function for editing user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    userForm.setFieldsValue(user);
    setIsUserModalVisible(true);
  };

  //  this is the function for deleting user
  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    message.success('User deleted successfully');
  };

  //  this is the function for updating user
  const handleUserUpdate = () => {
    userForm.validateFields().then((values) => {
      updateUser({ ...selectedUser, ...values });
      message.success('User updated successfully');
      setIsUserModalVisible(false);
      userForm.resetFields();
    });
  };

  //  this is the function for adding new department
  const handleDepartmentAdd = () => {
    departmentForm.validateFields().then((values) => {
      addDepartment({ id: Date.now(), ...values });
      message.success('Department added successfully');
      setIsDepartmentModalVisible(false);
      departmentForm.resetFields();
    });
  };

  //  this is the function for adding new user
  const handleUserAdd = () => {
    drawerForm.validateFields().then((values) => {
      addUser({ id: Date.now(), ...values });
      message.success('User added successfully');
      setIsDrawerVisible(false);
      drawerForm.resetFields();
    });
  };

  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh', 
      fontFamily: 'Roboto, sans-serif' }}>
      <Breadcrumb title="Home" breadcrumbItem="User Management" link="/dashboard" />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        marginBottom: '20px' 
        }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerVisible(true)}
          style={{ fontWeight: '500', marginBottom: '10px' }}
        >
          Add User
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDepartmentModalVisible(true)}
          style={{ fontWeight: '500', marginBottom: '10px' }}
        >
          Add Department
        </Button>
      </div>
      <UserTable
        users={users}
        departments={departments}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onMoveEmployee={moveEmployee}
        onRemoveEmployee={removeEmployee}
      />
      <UserModal
        visible={isUserModalVisible}
        onOk={handleUserUpdate}
        onCancel={() => setIsUserModalVisible(false)}
        form={userForm}
      />
      <DepartmentModal
        visible={isDepartmentModalVisible}
        onOk={handleDepartmentAdd}
        onCancel={() => setIsDepartmentModalVisible(false)}
        form={departmentForm}
      />
      <AddUserDrawer
        visible={isDrawerVisible}
        onOk={handleUserAdd}
        onCancel={() => setIsDrawerVisible(false)}
        form={drawerForm}
      />
    </div>
  );
};

export default UserManagement;
