import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8500/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (data) => API.post('/login', data);
export const fetchPeople = () => API.get('/people');
export const createPerson = (data) => API.post('/people', data);
export const updatePerson = (id, data) => API.put(`/people/${id}`, data);
export const deletePerson = (id) => API.delete(`/people/${id}`);
export const downloadAllPDF = () => API.get('/people/pdf', { responseType: 'blob' });
export const downloadSinglePDF = (id) => API.get(`/people/${id}/pdf`, { responseType: 'blob' });