import axios from 'axios';

import useAuthStore from '../../stores/auth';

const BASE_URL = `http://localhost:3333/api`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const { auth } = useAuthStore.getState();
    if (!config.headers.Authorization && auth?.accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
