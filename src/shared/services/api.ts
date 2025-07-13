import axios from 'axios';

export const baseURL = () => {
  const environment = process.env.NODE_ENV;

  if (environment === 'prod') {
    return 'http://api.garfai.com.br/';
  }
  return 'http://localhost:4000/';
}

const axiosServices = axios.create({
  baseURL: baseURL(),
  withCredentials: true,
});


axiosServices.interceptors.request.use(
  async (config) => {
    const selectedEnvironment = localStorage.getItem('environmentId');
    if (selectedEnvironment) {
      config.headers['environmentId'] = selectedEnvironment;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 && !window.location.href.includes('/login')) {
//       window.location.pathname = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosServices;