import axios from 'axios';

export const http = axios.create({
  baseURL: ' http://77.120.241.80:8911/api',
});

export const getUsers = () => http.get('/users');
export const createUser = user => http.post('/users', user);
export const updateUser = user => http.put(`/user/${user.id}`, user);
export const deleteUser = id => http.delete(`/user/${id}`);
