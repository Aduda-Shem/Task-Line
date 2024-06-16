import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const TaskModal = ({ isModalVisible, handleOk, handleCancel, form, users }) => {
  return (
    <Modal title="Add/Edit Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the task title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="User" name="userId" rules={[{ required: true, message: 'Please select the user!' }]}>
          <Select>
            {users.map(user => (
              <Option key={user.id} value={user.id}>{user.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Completed" name="completed" valuePropName="checked">
          <Input type="checkbox" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
