import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store/store';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserManagement from './pages/UserManagement';
import TaskBoard from './pages/TaskBoard';
import Dashboard from './pages/Dashboard';
import ToastNotification from './components/ToastNotification';
import NavigationBar from './components/NavigationBar';
import { setUser } from './redux/actions/userActions';
import ProtectedRoute from './components/ProtectedRoute';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  return children({ isAuthenticated });
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer>
          {({ isAuthenticated }) => (
            <>
              <ToastNotification />
              {isAuthenticated && <NavigationBar />}
              <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/user_management" element={<ProtectedRoute element={UserManagement} />} />
                <Route path="/taskboard" element={<ProtectedRoute element={TaskBoard} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
              </Routes>
            </>
          )}
        </AppInitializer>
      </Router>
    </Provider>
  );
};

export default App;
