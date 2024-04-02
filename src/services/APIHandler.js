import axios from 'axios';
import LocalStorage from './LocalStorage';
let local = new LocalStorage();
export const BASE_URL ='https://backend.handeeproducts.com/' 

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {Accept: 'application/json', 'xContent-Type': 'application/json'},
});

request.interceptors.request.use(
  async config => {
    await local.getSession(result => {
      if (result?.userInfo?.data?.token) {
        config.headers.Authorization =
      'Bearer ' + result?.userInfo?.data?.token;   
      }
    });
   return config;
  },
  error => Promise.reject(error),
);
request.interceptors.response.use(
  response => response,

  async error => {
    const {config, response} = error;
    if (
      response?.data?.error === 'Unauthenticated' ||
      response?.status == 401
    ) {
      try {
        console.log('API Response Unauthenticated');
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(error);
  },
);

export const getFormData = object => {
  const formData = new FormData();
  for (let key in object) {
    formData.append(key, object[key]);
  }
  return formData;
};
