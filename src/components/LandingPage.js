import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card } from 'antd';
import { TeamOutlined, AimOutlined, HeartOutlined } from '@ant-design/icons';
import landingImage from '../logo.jpg'; 

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div
        style={{
          background: `url(${landingImage}) no-repeat center center`,
          backgroundSize: 'cover',
          padding: '100px 0',
          color: 'white',
        }}
      >
        <Title level={1} style={{ marginBottom: '20px' }}>Welcome to Our Company</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '40px' }}>
          We are dedicated to providing the best services to our clients. Explore our platform to learn more about what we offer.
        </Paragraph>
        <div>
          <Button type="primary" size="large" style={{ margin: '10px' }}>
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
          </Button>
          <Button type="default" size="large" style={{ margin: '10px' }}>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={8}>
          <Card
            title={<><AimOutlined style={{ fontSize: '24px', color: '#08c' }} /> Our Mission</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>To deliver exceptional value to our customers through innovative and efficient solutions.</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<><TeamOutlined style={{ fontSize: '24px', color: '#08c' }} /> Our Vision</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>To be a global leader in our industry, recognized for our commitment to quality and customer satisfaction.</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<><HeartOutlined style={{ fontSize: '24px', color: '#08c' }} /> Our Values</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>Integrity, Excellence, Innovation, and Customer Focus.</Paragraph>
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '20px' }}>
        <Paragraph>&copy; 2024 Our Company. All rights reserved.</Paragraph>
      </div>
    </div>
  );
};

export default LandingPage;
