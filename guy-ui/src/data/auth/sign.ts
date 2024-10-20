import axios from '@/lib/axios';
import { z } from 'zod';

// Login with email and password

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginCredentialsDTO = z.infer<typeof loginCredentialsSchema>;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  return axios.post('/auth/login', data);
};


// Register with email and password

export const registerCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password is too short'),
  name: z.string().min(2, 'Name is too short')
});

export type RegisterCredentialsDTO = z.infer<typeof registerCredentialsSchema>;

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }
};

export const registerWithEmailAndPassword = async (data: RegisterCredentialsDTO): Promise<RegisterResponse> => {
  return axios.post(
    '/auth/register',
    {
      email: data.email,
      password: data.password,
      name: data.name
    }
  );
};

// Logout

export const logout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
