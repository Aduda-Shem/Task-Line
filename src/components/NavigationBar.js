import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  UnorderedListOutlined, 
  LogoutOutlined } from '@ant-design/icons';

const NavigationBar = () => {
  // checking if user is authenticated
  const isAuthenticated = Boolean(localStorage.getItem('user'));
  const navigate = useNavigate();

  // function to handle logout by clearing the logged on user in state
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const items = isAuthenticated
    ? [
      // links to display to authenticated users
        { label: <Link to="/dashboard"><DashboardOutlined /> Dashboard</Link>, key: 'dashboard' },
        { label: <Link to="/user_management"><UserOutlined /> User Management</Link>, key: 'usermanagement' },
        { label: <Link to="/taskboard"><UnorderedListOutlined /> Task Board</Link>, key: 'taskboard' },
      ]
    : [];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', backgroundColor: '#001529' }}>
      <Menu mode="horizontal" theme="dark" items={items} style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', backgroundColor: '#001529' }} />
      {isAuthenticated && (
        <Button type="link" onClick={handleLogout} style={{ color: 'white', marginRight: '20px' }}>
          <LogoutOutlined /> Logout
        </Button>
      )}
    </div>
  );
};

export default NavigationBar;
