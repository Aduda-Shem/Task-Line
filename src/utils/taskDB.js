import { initDB } from './indexedDB';

const STORE_NAME = 'tasks';

export const getTasksFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addTaskToDB = async (task) => {
  const db = await initDB();
  await db.add(STORE_NAME, task);
};

export const updateTaskInDB = async (task) => {
  const db = await initDB();
  await db.put(STORE_NAME, task);
};

export const deleteTaskFromDB = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};