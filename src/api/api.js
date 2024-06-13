import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchTasks = () => axios.get(`${API_URL}/todos`);

export const sendEmail = (emailData) => axios.post('http://localhost:5000/send-email', emailData);
