import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import FooterComponent from './Footer';
import FAQSection from './FAQSection';

const { Content } = Layout;

const LandingPage = () => (
  <Layout style={{ minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
    <HeaderComponent />
    <Content style={{ padding: '0 50px', marginTop: '64px', textAlign: 'center' }}>
      <HeroSection />
      <FeatureSection />
      <FAQSection/>
    </Content>
    <FooterComponent />
  </Layout>
);

export default LandingPage;
