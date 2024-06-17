import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';

const DepartmentsTable = ({ data, columns }) => {
  const isEmptyData = !data || data.length === 0;

  return (
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
      {isEmptyData ? (
        <p>No data available</p>
      ) : (
        <Table dataSource={data} columns={columns} pagination={false} />
      )}
    </Card>
  );
};

DepartmentsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number,
      completed: PropTypes.number,
      pending: PropTypes.number,
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

DepartmentsTable.defaultProps = {
  data: [],
};

export default DepartmentsTable;
