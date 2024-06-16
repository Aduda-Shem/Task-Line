// components/HeroSection.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import image1 from '../../images/image1.jpg';

const { Title, Paragraph } = Typography;

const HeroSection = () => (
  <div
    style={{
      background: `url(${image1}) no-repeat center center`,
      backgroundSize: 'cover',
      padding: '150px 0',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '40px',
      textAlign: 'center',
    }}
  >
    <Title level={1} style={{ color: 'white', marginBottom: '20px', fontWeight: '700' }}>Welcome to Granhm Tech Bytes</Title>
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
);

export default HeroSection;
