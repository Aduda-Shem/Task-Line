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
  REMOVE_EMPLOYEE,
} from '../actionTypes/userActionTypes';
import { fetchUsers as fetchUsersAPI } from '../../api/api';
import { showNotification } from './notificationActions';
import {
  getUsersFromDB,
  addUserToDB,
  updateUserInDB,
  deleteUserFromDB,
} from '../../utils/userDB';
import {
  getDepartmentsFromDB,
  addDepartmentToDB,
  updateDepartmentInDB,
  deleteDepartmentFromDB,
} from '../../utils/departmentDB';

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setUsers = (users) => ({
  type: SET_USERS, payload: users,
});

export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await getUsersFromDB();
    if (users.length > 0) {
      dispatch(setUsers(users));
    } else {
      const response = await fetchUsersAPI();
      const users = response.data;
      for (const user of users) {
        await addUserToDB(user);
      }
      dispatch(setUsers(users));
    }
  } catch (error) {
    dispatch(showNotification('Failed to fetch users', 'error'));
  }
};

export const addUser = (user) => async (dispatch, getState) => {
  try {
    await addUserToDB(user);
    dispatch({ type: ADD_USER, payload: user });
  } catch (error) {
    // console.error('Error adding user:', error);
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    await updateUserInDB(user);
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    // console.error('Error updating user:', error);
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    await deleteUserFromDB(userId);
    dispatch({ type: DELETE_USER, payload: userId });
  } catch (error) {
    // console.error('Error deleting user:', error);
  }
};

export const setDepartments = (departments) => ({
  type: SET_DEPARTMENTS, payload: departments,
});

export const fetchDepartments = () => async (dispatch) => {
  try {
    const departments = await getDepartmentsFromDB();
    dispatch(setDepartments(departments));
  } catch (error) {
    dispatch(showNotification('Failed to fetch departments', 'error'));
    // console.error('Error fetching :', error);
  }
};

export const addDepartment = (department) => async (dispatch, getState) => {
  try {
    await addDepartmentToDB(department);
    dispatch({ type: ADD_DEPARTMENT, payload: department });
  } catch (error) {
    // console.error('Error adding department:', error);
  }
};

export const updateDepartment = (department) => async (dispatch, getState) => {
  try {
    await updateDepartmentInDB(department);
    dispatch({ type: UPDATE_DEPARTMENT, payload: department });
  } catch (error) {
    // console.error('Error updating department:', error);
  }
};

export const deleteDepartment = (departmentId) => async (dispatch, getState) => {
  try {
    await deleteDepartmentFromDB(departmentId);
    dispatch({ type: DELETE_DEPARTMENT, payload: departmentId });
  } catch (error) {
    // console.error('Error deleting department:', error);
  }
};

export const moveEmployee = (userId, departmentId) => async (dispatch, getState) => {
  try {
    const users = await getUsersFromDB();
    const user = users.find(user => user.id === userId);
    if (user) {
      const updatedUser = { ...user, departmentId };
      await updateUserInDB(updatedUser);
      dispatch(updateUser(updatedUser));
      dispatch(setUsers(users.map(u => u.id === userId ? updatedUser : u)));
    }
  } catch (error) {
  }
};

export const removeEmployee = (userId) => async (dispatch, getState) => {
  try {
    await deleteUserFromDB(userId);
    dispatch({ type: REMOVE_EMPLOYEE, payload: userId });
  } catch (error) {
    // console.error('Error removing employee:', error);
  }
};
