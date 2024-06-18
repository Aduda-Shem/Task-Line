import React from 'react';
import { Modal, Form, Input } from 'antd';

const DepartmentModal = ({ visible, onOk, onCancel, form }) => {
  return (
    <Modal title="Add Department" visible={visible} 
    onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item label="Department Name" name="name" rules={[{ 
          required: true, 
          message: 'Please input the department name!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentModal;
