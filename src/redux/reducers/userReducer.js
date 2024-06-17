// redux/reducers/userReducer.js
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

const initialState = {
  user: null,
  users: [],
  departments: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    case DELETE_USER:
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    case SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case ADD_DEPARTMENT:
      return { ...state, departments: [...state.departments, action.payload] };
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.map((dept) =>
          dept.id === action.payload.id ? action.payload : dept
        ),
      };
    case DELETE_DEPARTMENT:
      return { ...state, departments: state.departments.filter((dept) => dept.id !== action.payload) };
    case REMOVE_EMPLOYEE:
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    default:
      return state;
  }
};

export default userReducer;
