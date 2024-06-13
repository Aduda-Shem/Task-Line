import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const NavigationBar = () => {
    const isAuthenticated = Boolean(localStorage.getItem('user'));

    const items = isAuthenticated
        ? [
            { label: <Link to="/dashboard">Dashboard</Link>, key: 'dashboard' },
            { label: <Link to="/user_management">User Management</Link>, key: 'usermanagement' },
            { label: <Link to="/taskboard">Task Board</Link>, key: 'taskboard' },
        ]
        : [
            // { label: <Link to="/">Home</Link>, key: 'home' },
            // { label: <Link to="/login">Login</Link>, key: 'login' },
            // { label: <Link to="/signup">Sign Up</Link>, key: 'signup' },
        ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', backgroundColor: '#001529' }}>
            <Menu mode="horizontal" theme="dark" items={items} style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: '#001529' }} />
        </div>
    );
};

export default NavigationBar;
