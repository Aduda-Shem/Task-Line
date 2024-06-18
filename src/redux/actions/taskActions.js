import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_ORDER,
  MARK_TASK_COMPLETE,
  SCHEDULE_TASK,
} from '../actionTypes/taskActionTypes';
import { fetchTasks as fetchTasksAPI, sendEmail } from '../../api/api';
import { showNotification } from './notificationActions';
import moment from 'moment';
import {
  getTasksFromDB,
  addTaskToDB,
  updateTaskInDB,
  deleteTaskFromDB,
} from '../../utils/taskDB';

export const setTasks = (tasks) => ({
  type: SET_TASKS, payload: tasks,
});

export const addTask = (task) => async (dispatch, getState) => {
  try {
    await addTaskToDB(task);
    dispatch({ 
      type: ADD_TASK, payload: task });
  } catch (error) {
    // console.error('Error addin:', error);
  }
};

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    await updateTaskInDB(task);
    dispatch({ type: UPDATE_TASK, payload: task });
  } catch (error) {
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    await deleteTaskFromDB(taskId);
    dispatch({ type: DELETE_TASK, payload: taskId });
  } catch (error) {
  }
};

export const updateTaskOrder = (tasks) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TASK_ORDER, payload: tasks });
};

export const markTaskComplete = (taskId) => async (dispatch, getState) => {
  try {
    const task = getState().tasks.tasks.find(task => task.id === taskId);
    const updatedTask = { ...task, completed: true };
    await updateTaskInDB(updatedTask);
    dispatch({ type: MARK_TASK_COMPLETE, payload: taskId });
  } catch (error) {
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const tasks = await getTasksFromDB();
    if (tasks.length > 0) {
      dispatch(setTasks(tasks));
    } else {
      const response = await fetchTasksAPI();
      const tasks = response.data;
      for (const task of tasks) {
        await addTaskToDB(task);
      }
      dispatch(setTasks(tasks));
    }
  } catch (error) {
    dispatch(showNotification('Failed to fetch tasks', 'error'));
  }
};

export const createTask = (task) => async (dispatch, getState) => {
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
    console.error('Error creating task:', error);
  }
};

export const modifyTask = (task) => async (dispatch, getState) => {
  try {
    dispatch(updateTask(task));
    dispatch(showNotification('Task updated successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to update task', 'error'));
    console.error('Error updating task:', error);
  }
};

export const removeTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch(deleteTask(taskId));
    dispatch(showNotification('Task deleted successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to delete task', 'error'));
    console.error('Error deleting task:', error);
  }
};

const getIntervalMilliseconds = (recurringType) => {
  // switch case to determine the recurrent time depending on user selection
  switch (recurringType) {
    case 'daily':
      return 24 * 60 * 60 * 1000;
    case 'weekly':
      return 7 * 24 * 60 * 60 * 1000;
    case 'monthly':
      return 30 * 24 * 60 * 60 * 1000;
    case 'quarterly':
      return 3 * 30 * 24 * 60 * 60 * 1000;
    case 'yearly':
      return 12 * 30 * 24 * 60 * 60 * 1000;
    default:
      return null;
  }
};

export const scheduleTask = (task) => async (dispatch, getState) => {
  try {
    const intervalMilliseconds = getIntervalMilliseconds(task.recurring);
    // eslint-disable-next-line
    const [startDate, endDate] = task.dateRange;
    const end = moment(endDate);

    const intervalId = setInterval(async () => {
      if (moment().isBefore(end)) {
        const newTask = { ...task, id: Date.now(), dateRange: undefined };
        await addTaskToDB(newTask);
        dispatch(addTask(newTask));
      } else {
        clearInterval(intervalId);
      }
    }, intervalMilliseconds);

    dispatch({ type: SCHEDULE_TASK, payload: { ...task, intervalId } });
    dispatch(showNotification('Task scheduled successfully', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to schedule task', 'error'));
  }
};
