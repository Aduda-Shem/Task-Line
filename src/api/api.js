import axios from 'axios';

// Origin URL to fetch data from JSON placeholder
const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchTasks = () => axios.get(`${API_URL}/todos`);

export const sendEmail = (
    emailData) => axios.post(
        // sending email by triggering the send email functionality 
        'http://localhost:5000/send-email', 
        emailData);
