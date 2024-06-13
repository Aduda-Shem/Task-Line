import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card } from 'antd';
import { SmileOutlined, BulbOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <Title level={1} className="hero-title">Discover Digital Art & Collect NFTs</Title>
        <Title level={2} className="hero-subtitle">Marketplace</Title>
        <Paragraph className="hero-description">
          Can artwork be NFT? NFTs (non-fungible tokens) are one-of-a-kind digital assets. Given they're digital in nature, can physical works of art be turned into NFTs?
        </Paragraph>
        <div className="hero-buttons">
          <Button type="primary" size="large" className="hero-button">
            <Link to="/create">Create Own</Link>
          </Button>
          <Button size="large" className="hero-button">
            <Link to="/explore">Explore Now</Link>
          </Button>
        </div>
      </div>
      <div className="connect-section">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Connect NFT Marketplace</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="MetaMask"
              bordered={false}
              cover={<img alt="MetaMask" src="https://via.placeholder.com/150" />}
              className="connect-card"
            >
              <Paragraph>MetaMask is a popular cryptocurrency wallet that supports a wide range of digital assets.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Coinbase Wallet"
              bordered={false}
              cover={<img alt="Coinbase Wallet" src="https://via.placeholder.com/150" />}
              className="connect-card"
            >
              <Paragraph>Coinbase Wallet is a self-custody wallet giving you complete control of your digital assets.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Binance"
              bordered={false}
              cover={<img alt="Binance" src="https://via.placeholder.com/150" />}
              className="connect-card"
            >
              <Paragraph>Binance is considered a safe exchange for trading cryptocurrencies and NFTs.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
