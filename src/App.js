// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import LandingPage from './components/landing/LandingPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserManagement from './pages/users/UserManagement';
import TaskBoard from './pages/tasks/TaskBoard';
import Dashboard from './pages/dashboard/Dashboard';
import ToastNotification from './components/ToastNotification';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { useLocation } from 'react-router-dom';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <>
      <ToastNotification />
      {isAuthenticated && location.pathname !== '/' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/user_management" element={<ProtectedRoute element={UserManagement} />} />
        <Route path="/taskboard" element={<ProtectedRoute element={TaskBoard} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
