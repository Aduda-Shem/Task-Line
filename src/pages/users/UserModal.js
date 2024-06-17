import React from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Select } from 'antd';

const { Option } = Select;

const UserModal = ({ visible, onOk, onCancel, form }) => {
  return (
    <Modal title="Edit User" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" 
        rules={[{ 
          required: true, 
          message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" 
        rules={[{ 
          required: true, message: 'Please input the email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" 
        rules={[{ 
          required: false, message: 'Please input the user Address!' }]}>
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
  );
};

export default UserModal;
