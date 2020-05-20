import axios from 'axios';

export const http = axios.create({
  baseURL: ' http://77.120.241.80:8911/api',
});

export const getUsers = () => http.get('/users');
export const createUser = () => http.post('/users');
export const updateUser = id => http.put(`/user/${id}`);
export const deleteUser = id => http.delete(`/user/${id}`);
