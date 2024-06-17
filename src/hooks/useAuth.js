import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/actions/userActions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return { isAuthenticated };
};
