import axios from "./axios";
import { storage } from "./storage"

type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const createSession = ({ accessToken, refreshToken, expiresAt }: Session) => {
  storage.set('accessToken', accessToken);
  storage.set('refreshToken', refreshToken);
  storage.set('expiresAt', expiresAt);

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const deleteSession = async () => {
  storage.remove('accessToken');
  storage.remove('refreshToken');

  delete axios.defaults.headers.common['Authorization'];
}

export const getSession = async () => {
  const accessToken = storage.get('accessToken');
  const refreshToken = storage.get('refreshToken');
  const expiresAt = storage.get('expiresAt');
  
  if (!accessToken || !refreshToken || !expiresAt) {
    return null;
  }

  if (expiresAt < Date.now()) {
    return null;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return { accessToken, refreshToken, expiresAt };
}
