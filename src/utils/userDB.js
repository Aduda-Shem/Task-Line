import { initDB } from './indexedDB';

const STORE_NAME = 'users';

export const getUsersFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addUserToDB = async (user) => {
  const db = await initDB();
  await db.add(STORE_NAME, user);
};

export const updateUserInDB = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};

export const deleteUserFromDB = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};