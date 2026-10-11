import axios from 'axios';

// baseURL не задаём: apiUrl у каждого инстанса свой, полный адрес собирается в greenApi.ts
const api = axios.create({
  timeout: 30000,
});

export default api;
