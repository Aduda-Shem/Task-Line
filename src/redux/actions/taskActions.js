import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_ORDER,
  MARK_TASK_COMPLETE,
} from '../actionTypes/taskActionTypes';
import { fetchTasks as fetchTasksAPI, sendEmail } from '../../api/api';
import { showNotification } from './notificationActions';

export const setTasks = tasks => ({ type: SET_TASKS, payload: tasks });
export const addTask = task => ({ type: ADD_TASK, payload: task });
export const updateTask = task => ({ type: UPDATE_TASK, payload: task });
export const deleteTask = taskId => ({ type: DELETE_TASK, payload: taskId });
export const updateTaskOrder = tasks => ({ type: UPDATE_TASK_ORDER, payload: tasks });
export const markTaskComplete = (taskId) => ({ type: MARK_TASK_COMPLETE, payload: taskId });

export const fetchTasks = () => async dispatch => {
  try {
    const response = await fetchTasksAPI();
    dispatch(setTasks(response.data));
  } catch (error) {
    dispatch(showNotification('Failed to fetch tasks', 'error'));
  }
};

export const createTask = (task) => async dispatch => {
  try {
    dispatch(addTask(task));
    const emailData = {
      to: task.assigneeEmail,
      subject: 'New Task Assigned',
      text: `You have been assigned a new task: ${task.title}`,
    };
    await sendEmail(emailData);
    dispatch(showNotification('Task created and email sent successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to create task', 'error'));
  }
};

export const modifyTask = (task) => async dispatch => {
  try {
    dispatch(updateTask(task));
    dispatch(showNotification('Task updated successfully', 'success'));
  } catch (error) {
    dispatch.showNotification('Failed to update task', 'error');
  }
};

export const removeTask = (taskId) => async dispatch => {
  try {
    dispatch(deleteTask(taskId));
    dispatch(showNotification('Task deleted successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to delete task', 'error'));
  }
};
