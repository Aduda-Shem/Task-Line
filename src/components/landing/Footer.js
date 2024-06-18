import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const FooterComponent = () => (
  <footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '20px 50px' }}>
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
          Email: info@granhm.com <br />
          Phone: 1234567890
        </Paragraph>
      </Col>
      <Col span={8}>
        <Title level={4} style={{ color: 'white', fontWeight: '700' }}>Follow Us</Title>
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: '500' }}>
          <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>Facebook</a> | <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>Twitter</a> | <a href="https://task-line.vercel.app/" style={{ color: '#08c' }}>LinkedIn</a>
        </Paragraph>
      </Col>
    </Row>
    &copy; 2024. All rights reserved.
  </footer>
);

export default FooterComponent;
