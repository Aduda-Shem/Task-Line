import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { showNotification } from '../redux/actions/notificationActions';
import { setUser } from '../redux/actions/userActions';
import { fetchUsers } from '../api/api';

const { Title } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      const user = response.data.find(
        (user) => user.email === (values.email || 'Antonette') && user.address.zipcode === (values.zipcode || '90566-7771')
      );

      if (user) {
        const userData = { 
          id: user.id, 
          email: user.email, 
          role: 'admin', 
          name: user.name 
        }; 
        localStorage.setItem(
          'user', JSON.stringify(userData)
        );
        dispatch(setUser(userData));
        navigate('/dashboard');
        window.location.reload(); 
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div style={{ padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Login</Title>
          <Form form={form} onFinish={handleLogin} layout="vertical" initialValues={{ email: 'Shanna@melissa.tv', zipcode: '90566-7771' }}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Zip Code" name="zipcode" rules={[{ required: true, message: 'Please input your zip code!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
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
