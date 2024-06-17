// components/FeatureSection.js

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  AimOutlined, 
  HeartOutlined, 
  TeamOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const FeatureSection = () => (
  <>
    <Typography.Title level={2} style={{ marginBottom: '40px', fontWeight: '700', textAlign: 'center' }}>Our Features</Typography.Title>
    <Row gutter={16} style={{ marginBottom: '40px' }}>
      <Col span={8}>
        <Card
          title={<><AimOutlined style={{ fontSize: '24px', color: '#08c' }} /> Task Management</>}
          bordered={false}
          style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', fontFamily: 'Roboto, sans-serif' }}
        >
          <Paragraph>Manage tasks efficiently and ensure timely completion.</Paragraph>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title={<><TeamOutlined style={{ fontSize: '24px', color: '#08c' }} /> Department Management</>}
          bordered={false}
          style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', fontFamily: 'Roboto, sans-serif' }}
        >
          <Paragraph>Create and manage departments within the organization.</Paragraph>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title={<><HeartOutlined style={{ fontSize: '24px', color: '#08c' }} /> Employee Management</>}
          bordered={false}
          style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', fontFamily: 'Roboto, sans-serif' }}
        >
          <Paragraph>Manage employee roles and responsibilities effectively.</Paragraph>
        </Card>
      </Col>
    </Row>
  </>
);

export default FeatureSection;
