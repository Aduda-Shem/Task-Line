import { initDB } from './indexedDB';

const STORE_NAME = 'departments';

export const getDepartmentsFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addDepartmentToDB = async (department) => {
  const db = await initDB();
  await db.add(STORE_NAME, department);
};

export const updateDepartmentInDB = async (department) => {
  const db = await initDB();
  await db.put(STORE_NAME, department);
};

export const deleteDepartmentFromDB = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
