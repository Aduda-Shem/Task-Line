import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card, Layout, Menu } from 'antd';
import { AimOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';
import landingImage from '../logo.jpg'; 

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <Layout>
      <Header style={{ background: '#001529', padding: 0 }}>
        <div className="logo" style={{ float: 'left', color: 'white', fontSize: '20px', padding: '0 24px' }}>
          Company Name
        </div>
        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          <Menu.Item key="1">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div
          style={{
            background: `url(${landingImage}) no-repeat center center`,
            backgroundSize: 'cover',
            padding: '100px 0',
            textAlign: 'center',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          <Title level={1} style={{ color: 'white', marginBottom: '20px' }}>Welcome to Our Company</Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: '40px', color: 'white' }}>
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
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: '40px' }}>
        &copy; 2024 Our Company. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default LandingPage;
