import React from 'react';
import { Row, Col, Select, Input } from 'antd';

const { Option } = Select;

const TaskFilter = ({ onFilterChange, departments }) => (
  <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
    <Col xs={24} sm={12} md={8}>
      <Select
        placeholder="Filter by Department"
        style={{ width: '100%' }}
        onChange={(value) => onFilterChange('department', value)}
      >
        <Option value="">All Departments</Option>
        {departments.map((dept) => (
          <Option key={dept.id} value={dept.id}>
            {dept.name}
          </Option>
        ))}
      </Select>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Select
        placeholder="Filter by Status"
        style={{ width: '100%' }}
        onChange={(value) => onFilterChange('status', value)}
      >
        <Option value="">All Statuses</Option>
        <Option value="completed">Completed</Option>
        <Option value="pending">Pending</Option>
      </Select>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Input.Search
        placeholder="Search by Task Title"
        onSearch={(value) => onFilterChange('search', value)}
      />
    </Col>
  </Row>
);

export default TaskFilter;
