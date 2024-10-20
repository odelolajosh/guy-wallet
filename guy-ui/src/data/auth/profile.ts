import axios from '@/lib/axios';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

/*
{
    "id": 3,
    "user": {
        "id": "97e9b54a-5405-49f4-a4b9-72d3b0d66644",
        "uid": "NAysndQMkYWS8ooTOikj9x9UzUO2",
        "email": "testmail4@mail.com",
        "first_name": "test1",
        "last_name": "last1"
    },
    "picture": null
}
    */

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
