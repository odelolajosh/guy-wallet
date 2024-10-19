import axios from '@/lib/axios';
import { z } from 'zod';

// Login with email and password

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginCredentialsDTO = z.infer<typeof loginCredentialsSchema>;

export type LoginResponse = {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user_data: {
      id: number;
      email: string;
      first_name: string;
      last_name: string
    }
  }
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  return axios.post('/auth/sign-in/', data);
};


// Register with email and password

export const registerCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password is too short'),
  name: z.string().min(2, 'Name is too short')
});

export type RegisterCredentialsDTO = z.infer<typeof registerCredentialsSchema>;

export type RegisterResponse = {
  status: string;
  message: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string
  }
};

export const registerWithEmailAndPassword = async (data: RegisterCredentialsDTO): Promise<RegisterResponse> => {
  const firstName = data.name.split(' ')[0];
  const lastName = data.name.split(' ')[1] ?? '';
  return axios.post(
    '/auth/sign-up/',
    {
      email: data.email,
      password: data.password,
      first_name: firstName,
      last_name: lastName
    }
  );
};

// Logout

export const logout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
