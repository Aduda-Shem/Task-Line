import React from 'react';
import { Card, Table } from 'antd';

const DepartmentsTable = ({ data, columns }) => (
  <Card
    title="Departments"
    bordered={false}
    style={{
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      background: '#ffffff',
    }}
  >
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

export default DepartmentsTable;
