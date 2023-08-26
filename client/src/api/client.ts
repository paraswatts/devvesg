import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { AuthRoutes } from 'src/routes/auth';

axios.defaults.baseURL = process.env.REACT_APP_HOST || 'http://localhost:5000';

let bearerToken = '';

export function setBearerToken(_bearerToken: string) {
  bearerToken = _bearerToken;
}

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('login')) {
      localStorage.removeItem('token');
      setBearerToken('');
      window.location.href = AuthRoutes.LOGIN;
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(function (request) {
  if (bearerToken.length > 0) {
    request.headers = {
      ...request.headers,
      Authorization: bearerToken,
    };
  }

  return request;
});

export function get<T>(url: string, config?: AxiosRequestConfig) {
  return axios.get<T>(url, config).then((response) => response.data);
}

export function put<T>(url: string, data: any, config?: AxiosRequestConfig) {
  return axios.put<T>(url, data, config).then((response) => response.data);
}

export function post<T>(url: string, data: any, config?: AxiosRequestConfig) {
  return axios.post<T>(url, data, config).then((response) => response.data);
}

export function patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
  return axios.patch<T>(url, data, config).then((response) => response.data);
}

export function destroy<T>(url: string, config?: AxiosRequestConfig) {
  return axios.delete<T>(url, config).then((response) => response.data);
}
