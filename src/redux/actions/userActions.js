// redux/actions/userActions.js

import {
  SET_USER,
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_DEPARTMENTS,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  MOVE_EMPLOYEE,
  REMOVE_EMPLOYEE,
} from '../actionTypes/userActionTypes';
import { fetchUsers as fetchUsersAPI } from '../../api/api';
import { showNotification } from './notificationActions';

const persistData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setUsers = (users) => {
  persistData('users', users);
  return { type: SET_USERS, payload: users };
};

export const addUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = [...users, user];
  persistData('users', updatedUsers);
  return { type: ADD_USER, payload: user };
};

export const updateUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
  persistData('users', updatedUsers);
  return { type: UPDATE_USER, payload: user };
};

export const deleteUser = (userId) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.filter((user) => user.id !== userId);
  persistData('users', updatedUsers);
  return { type: DELETE_USER, payload: userId };
};

export const setDepartments = (departments) => {
  persistData('departments', departments);
  return { type: SET_DEPARTMENTS, payload: departments };
};

export const addDepartment = (department) => {
  const departments = JSON.parse(localStorage.getItem('departments')) || [];
  const updatedDepartments = [...departments, department];
  persistData('departments', updatedDepartments);
  return { type: ADD_DEPARTMENT, payload: department };
};

export const updateDepartment = (department) => {
  const departments = JSON.parse(localStorage.getItem('departments')) || [];
  const updatedDepartments = departments.map((d) => (d.id === department.id ? department : d));
  persistData('departments', updatedDepartments);
  return { type: UPDATE_DEPARTMENT, payload: department };
};

export const deleteDepartment = (departmentId) => {
  const departments = JSON.parse(localStorage.getItem('departments')) || [];
  const updatedDepartments = departments.filter((department) => department.id !== departmentId);
  persistData('departments', updatedDepartments);
  return { type: DELETE_DEPARTMENT, payload: departmentId };
};

export const moveEmployee = (userId, departmentId) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, departmentId } : user
  );
  persistData('users', updatedUsers);
  return { type: MOVE_EMPLOYEE, payload: { userId, departmentId } };
};

export const removeEmployee = (userId) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.filter((user) => user.id !== userId);
  persistData('users', updatedUsers);
  return { type: REMOVE_EMPLOYEE, payload: userId };
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fetchUsersAPI();
    dispatch(setUsers(response.data));
  } catch (error) {
    dispatch(showNotification('Failed to fetch users', 'error'));
  }
};
