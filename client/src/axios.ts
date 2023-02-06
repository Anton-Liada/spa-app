import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    'access_token',
  )}`;

  return config;
});

export default instance;
