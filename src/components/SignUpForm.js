import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { showNotification } from '../redux/actions/notificationActions';
import { setUser } from '../redux/actions/userActions';
import { addUserToDB } from '../utils/userDB';

const { Title } = Typography;

const SignUpForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const user = { 
        id: Date.now(), 
        email: values.email, 
        role: 'employee', 
        name: values.name, 
        address: { zipcode: values.zipcode } 
      };

      // here, we save user info to IndexedDB
      await addUserToDB(user);

      // Dispatch action to set user in Redux store
      dispatch(setUser(user));

      // Show notification and redirect
      dispatch(showNotification('Signed up successfully', 'success'));
      // Redirects user to dashboard after suuccessful sign in 
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      message.error('Sign-up failed. Please try again.');
      // console.error('Sign-up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5' 
      }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div style={{ padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</Title>
          <Form form={form} onFinish={handleSignUp} layout="vertical">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="zipcode" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Sign Up
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpForm;
