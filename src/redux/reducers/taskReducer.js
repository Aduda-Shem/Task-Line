import {
    SET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    UPDATE_TASK_ORDER,
  } from '../actionTypes/taskActionTypes';
  
  const initialState = {
    tasks: [],
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TASKS:
        return { ...state, tasks: action.payload };
      case ADD_TASK:
        return { ...state, tasks: [...state.tasks, action.payload] };
      case UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
        };
      case DELETE_TASK:
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
      case UPDATE_TASK_ORDER:
        return { ...state, tasks: action.payload };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  