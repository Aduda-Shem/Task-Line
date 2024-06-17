import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const TaskModal = ({ isModalVisible, handleOk, handleCancel, form, users }) => {
  const [recurringType, setRecurringType] = useState('none');

  const handleRecurringChange = (value) => {
    setRecurringType(value);
  };

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
          <Checkbox />
        </Form.Item>
        <Form.Item label="Recurring" name="recurring" initialValue="none">
          <Select onChange={handleRecurringChange}>
            <Option value="none">None</Option>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </Form.Item>
        {recurringType !== 'none' && (
          <Form.Item label="Select Date Range" name="dateRange" rules={[{ required: true, message: 'Please select the date range!' }]}>
            <RangePicker
              disabledDate={(current) => current && current < moment().startOf('day')}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default TaskModal;
