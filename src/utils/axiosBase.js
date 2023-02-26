import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  config.headers.AccessControlAllowOrigin = '*';
  config.headers.AccessControlAllowMethods = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

  return config;
});

export default instance;
