import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import taskReducer from '../reducers/taskReducer';
import notificationReducer from '../reducers/notificationReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
