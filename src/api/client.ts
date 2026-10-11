import axios from 'axios';

// No baseURL: every instance has its own apiUrl, the full address is built in greenApi.ts
const api = axios.create({
  timeout: 30000,
});

export default api;
