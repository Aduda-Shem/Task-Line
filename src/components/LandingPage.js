import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Typography, Row, Col, Card } from 'antd';
import image1 from '../images/image1.jpg';
import { AimOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';

// Ant Design layout components
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <Header style={{ background: '#001529', padding: '0 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          Granhm Tech Bytes
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '64px', textAlign: 'center' }}>
        <div
          style={{
            background: `url(${image1}) no-repeat center center`,
            backgroundSize: 'cover',
            padding: '150px 0',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginBottom: '40px',
          }}
        >
          <Title level={1} style={{ color: 'white', marginBottom: '20px', fontWeight: '700' }}>Welcome to Granhm Tech Bytes
          </Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: '40px', color: 'white', fontWeight: '500' }}>
            We are dedicated to providing the best services to our clients. Explore our platform to learn more about what we offer.
          </Paragraph>
          <div>
            <Button type="primary" size="large" style={{ margin: '10px', fontWeight: '500' }}>
              <Link to="/login" style={{ color: 'white' }}>Login</Link>
            </Button>
            <Button type="default" size="large" style={{ margin: '10px', fontWeight: '500' }}>
              <Link to="/signup" style={{ color: 'white' }}>Sign Up</Link>
            </Button>
          </div>
        </div>
        <Title level={2} style={{ marginBottom: '40px', fontWeight: '700' }}>Our Features</Title>
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
      </Content>
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '20px 50px' }}>
        <Row>
          <Col span={8}>
            <Title level={4} style={{ color: 'white', fontWeight: '700' }}>About Us</Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: '500' }}>
              We are a leading company in our industry, committed to providing top-notch services to our clients.
            </Paragraph>
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: 'white', fontWeight: '700' }}>Contact Us</Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: '500' }}>
              Email: info@company.com <br />
              Phone: (123) 456-7890
            </Paragraph>
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: 'white', fontWeight: '700' }}>Follow Us</Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: '500' }}>
              <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>Facebook</a> | <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>Twitter</a> | <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>LinkedIn</a>
            </Paragraph>
          </Col>
        </Row>
        &copy; 2024 Our Company. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default LandingPage;
