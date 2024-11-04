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
}

export const deleteSession = async () => {
  storage.remove('accessToken');
  storage.remove('refreshToken');
}

export const updateSession = async ({ accessToken, expiresAt }: Omit<Session, 'refreshToken'>) => {
  storage.set('accessToken', accessToken);
  storage.set('expiresAt', expiresAt);
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

  return { accessToken, refreshToken, expiresAt };
}
