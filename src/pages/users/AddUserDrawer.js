import React from 'react';
import { Drawer, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const AddUserDrawer = ({ visible, onOk, onCancel, form }) => {
  return (
    <Drawer
      title="Add User"
      width={400}
      onClose={onCancel}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onOk} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ 
          required: true, 
          message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ 
          required: true, 
          message: 'Please input the email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username" rules={[{ 
          required: true, 
          message: 'Please input the username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ 
          required: true, 
          message: 'Please input the address!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ 
          required: true, 
          message: 'Please select the role!' }]}>
          <Select>
            <Option value="employee">Employee</Option>
            <Option value="manager">Manager</Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddUserDrawer;
