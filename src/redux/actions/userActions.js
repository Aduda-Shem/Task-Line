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

export const setUser = user => ({ type: SET_USER, payload: user });
export const setUsers = users => ({ type: SET_USERS, payload: users });
export const addUser = user => ({ type: ADD_USER, payload: user });
export const updateUser = user => ({ type: UPDATE_USER, payload: user });
export const deleteUser = userId => ({ type: DELETE_USER, payload: userId });
export const setDepartments = departments => ({ type: SET_DEPARTMENTS, payload: departments });
export const addDepartment = department => ({ type: ADD_DEPARTMENT, payload: department });
export const updateDepartment = department => ({ type: UPDATE_DEPARTMENT, payload: department });
export const deleteDepartment = departmentId => ({ type: DELETE_DEPARTMENT, payload: departmentId });
export const moveEmployee = (userId, departmentId) => ({ type: MOVE_EMPLOYEE, payload: { userId, departmentId } });
export const removeEmployee = (userId) => ({ type: REMOVE_EMPLOYEE, payload: userId });

export const fetchUsers = () => async dispatch => {
  try {
    const response = await fetchUsersAPI();
    dispatch(setUsers(response.data));
  } catch (error) {
    dispatch(showNotification('Failed to fetch users', 'error'));
  }
};

export const createUser = (user) => async dispatch => {
  try {
    dispatch(addUser(user));
    dispatch(showNotification('User created successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to create user', 'error'));
  }
};

export const modifyUser = (user) => async dispatch => {
  try {
    dispatch(updateUser(user));
    dispatch(showNotification('User updated successfully', 'success'));
  } catch (error) {
    dispatch.showNotification('Failed to update user', 'error');
  }
};

export const removeUser = (userId) => async dispatch => {
  try {
    dispatch(deleteUser(userId));
    dispatch(showNotification('User deleted successfully', 'success'));
  } catch (error) {
    dispatch.showNotification('Failed to delete user', 'error');
  }
};

export const createDepartment = (department) => async dispatch => {
  try {
    dispatch(addDepartment(department));
    dispatch(showNotification('Department created successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to create department', 'error'));
  }
};

export const modifyDepartment = (department) => async dispatch => {
  try {
    dispatch(updateDepartment(department));
    dispatch(showNotification('Department updated successfully', 'success'));
  } catch (error) {
    dispatch.showNotification('Failed to update department', 'error');
  }
};

export const removeDepartment = (departmentId) => async dispatch => {
  try {
    dispatch(deleteDepartment(departmentId));
    dispatch(showNotification('Department deleted successfully', 'success'));
  } catch (error) {
    dispatch.showNotification('Failed to delete department', 'error');
  }
};
