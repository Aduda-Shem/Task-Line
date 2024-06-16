// hooks/useUsers.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser, addDepartment, moveEmployee, removeEmployee } from '../redux/actions/userActions';

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const departments = useSelector(state => state.users.departments);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    users,
    departments,
    addUser: (user) => dispatch(addUser(user)),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
    addDepartment: (department) => dispatch(addDepartment(department)),
    moveEmployee: (userId, departmentId) => dispatch(moveEmployee(userId, departmentId)),
    removeEmployee: (userId) => dispatch(removeEmployee(userId)),
  };
};
