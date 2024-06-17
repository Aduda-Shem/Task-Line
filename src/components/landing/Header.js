import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

// Destructure Header from Layout
const { Header } = Layout;

const HeaderComponent = () => (
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
);

export default HeaderComponent;
