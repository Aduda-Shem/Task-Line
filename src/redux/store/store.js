import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import taskReducer from '../reducers/taskReducer';
import notificationReducer from '../reducers/notificationReducer';
import { fetchUsers as fetchUsersAPI, fetchTasks as fetchTasksAPI } from '../../api/api';
import { getUsersFromDB, addUserToDB } from '../../utils/userDB';
import { getTasksFromDB, addTaskToDB } from '../../utils/taskDB';

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

const fetchAndPopulateDB = async () => {
  const users = await getUsersFromDB();
  const tasks = await getTasksFromDB();

  if (users.length === 0) {
    const userResponse = await fetchUsersAPI();
    for (const user of userResponse.data) {
      await addUserToDB(user);
    }
  }

  if (tasks.length === 0) {
    const taskResponse = await fetchTasksAPI();
    for (const task of taskResponse.data) {
      await addTaskToDB(task);
    }
  }

  return {
    users: await getUsersFromDB(),
    tasks: await getTasksFromDB(),
  };
};

const initializeStore = async () => {
  const initialData = await fetchAndPopulateDB();

  const persistedState = loadState();

  const preloadedState = {
    users: persistedState?.users || { users: initialData.users },
    tasks: persistedState?.tasks || { tasks: initialData.tasks },
    notifications: persistedState?.notifications || {},
  };

  const store = configureStore({
    reducer: {
      users: userReducer,
      tasks: taskReducer,
      notifications: notificationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState,
  });

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default initializeStore;
