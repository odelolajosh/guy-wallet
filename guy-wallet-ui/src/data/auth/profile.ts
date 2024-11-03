import axios from '@/lib/axios';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserResponse {
  user: {
    id: string
    email: string
    name: string
    createdAt: string
  }
}

export const getMe = async (): Promise<User> => {
  const response = (await axios.get('/auth/me')) as UserResponse;
  return response.user;
};
