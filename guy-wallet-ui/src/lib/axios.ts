import Axios, { AxiosError } from 'axios';
import { baseURL } from './const';
import { deleteSession, getSession, updateSession } from './session';

export type ErrorData = {
  detail: string;
};

const axios = Axios.create({
  baseURL,
});

// interceptors
axios.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    config.headers = config.headers || {}; // Ensure headers object exists
    config.headers['Authorization'] = `Bearer ${session.accessToken}`;
  } else if (config.headers?.['Authorization']) {
    delete config.headers['Authorization'];
  }

  config.headers['Content-Type'] = 'application/json';
  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config: originalRequest, response } = error;

    console.log('Request failed', error);

    // Skip refresh token request, retry attempts to avoid infinite loops
    if (originalRequest.url !== '/auth/refresh' && !originalRequest.isRetryAttempt && response && response.status === 401) {
      try {
        originalRequest.isRetryAttempt = true;
        const session = await getSession();
        if (!session) {
          throw error;
        }
        
        const { accessToken } = await axios.post('/auth/refresh', {
          refreshToken: session.refreshToken,
        }) as { accessToken: string };

        updateSession({ accessToken, expiresAt: Date.now() + 60 * 60 * 1000 });
        
        return axios.request(originalRequest);
      } catch (err) {
        const e = err as AxiosError;

        if (e.response && e.response.status === 401) {
          deleteSession();
          window.location.reload();
        }

        // suppress original error to throw the new one to get new information
        throw e;
      }
    } else {
      throw error;
    }
  }
);

export default axios;
