import Axios from 'axios';
import { baseURL } from './const';

export type ErrorData = {
  detail: string;
};

/** Axios instance tailored for the API. */
const axios = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptors
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;