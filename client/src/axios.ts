import axios from 'axios';

export const BASE_URL = 'https://nest-server-omcz.onrender.com';

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
