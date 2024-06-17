import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { setUser } from '../redux/actions/userActions';
import { fetchUsers as fetchUsersAPI } from '../api/api';
import ToastNotification from './ToastNotification';
import { getUsersFromDB, addUserToDB } from '../utils/userDB';

const { Title, Paragraph } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      let users = await getUsersFromDB();

      if (users.length === 0) {
        const response = await fetchUsersAPI();
        users = response.data;
        for (const user of users) {
          await addUserToDB(user);
        }
      }

      const user = users.find(
        (user) => user.email === values.email && user.address.zipcode === values.zipcode
      );

      if (user) {
        const userData = { 
          id: user.id, 
          email: user.email, 
          role: 'admin', 
          name: user.name 
        };
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(setUser(userData));
        message.success('Login successful');
        navigate('/dashboard');
        window.location.reload(); 
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Roboto, sans-serif' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <ToastNotification />
        <div style={{ padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Login</Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: '20px' }}>Access your account by logging in</Paragraph>
          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            initialValues={{ email: 'Shanna@melissa.tv', zipcode: '90566-7771' }}
            style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Zip Code" name="zipcode" rules={[{ required: true, message: 'Please input your zip code!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ fontWeight: '500' }}>
                Login
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Link to="/signup">Don't have an account? Register</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
