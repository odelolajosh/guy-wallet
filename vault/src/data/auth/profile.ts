import axios from '@/lib/axios';

export interface User {
  id: number;
  email: string;
  name: string;
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
  id: number
  user: {
    id: string
    email: string
    first_name: string
    last_name: string | null
  }
  picture: string | null
}

export const getMe = async (): Promise<User> => {
  const response = (await axios.get('/auth/profile/')) as UserResponse;
  return {
    id: response.id,
    email: response.user.email,
    name: `${response.user.first_name}${response.user.last_name ? ` ${response.user.last_name}` : ''}`
  };
};
