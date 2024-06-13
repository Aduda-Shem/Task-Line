import {
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
  } from '../actionTypes/notificationActionTypes';
  
  const initialState = {
    message: '',
    type: '',
    visible: false,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_NOTIFICATION:
        return { ...state, ...action.payload, visible: true };
      case HIDE_NOTIFICATION:
        return { ...state, visible: false };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  