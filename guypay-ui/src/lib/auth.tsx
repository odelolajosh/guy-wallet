import type { LoginCredentialsDTO, RegisterCredentialsDTO, User } from '@/data/auth';
import { getMe, loginWithEmailAndPassword, logout, registerWithEmailAndPassword } from '@/data/auth';
import { configureAuth } from 'react-query-auth';
import { createSession, deleteSession, getSession } from './session';

const userFn = async () => {
  try {
    getSession();
    const response = await getMe();
    return response ?? {};
  } catch (err) {
    console.log(err);
    return null;
  }
};

const loginFn = async (credentials: LoginCredentialsDTO): Promise<User> => {
  const response = await loginWithEmailAndPassword(credentials);
  const { access_token, refresh_token, user_data } = response.data

  createSession({
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: Date.now() + 60 * 60 * 1000
  })

  return {
    id: user_data.id,
    email: user_data.email,
    name: `${user_data.first_name}${user_data.last_name ? ` ${user_data.last_name}` : ''}`
  };
};

const registerFn = async (credentials: RegisterCredentialsDTO): Promise<User> => {
  const response = await registerWithEmailAndPassword(credentials);
  const { access_token, refresh_token, data } = response;
  
  createSession({
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: Date.now() + 60 * 60 * 1000
  })

  return {
    id: data.id,
    email: data.email,
    name: `${data.first_name}${data.last_name ? ` ${data.last_name}` : ''}`
  };
};

const logoutFn = async () => {
  await logout()
  deleteSession()
};

const config = {
  userFn,
  loginFn,
  registerFn,
  logoutFn
};

// eslint-disable-next-line react-refresh/only-export-components
export const { useUser, useLogin, useRegister, useLogout } = configureAuth<
  User | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(config);

export function AuthLoader({
  children,
  renderLoading,
  renderUnauthenticated,
  renderError = (error: Error) => <>{JSON.stringify(error)}</>
}: {
  children: React.ReactNode;
  renderLoading: () => JSX.Element;
  renderUnauthenticated?: () => JSX.Element;
  renderError?: (error: Error) => JSX.Element;
}) {
  const { isSuccess, isFetched, status, data, error } = useUser();

  if (isSuccess) {
    if (renderUnauthenticated && !data) {
      return renderUnauthenticated();
    }

    return <>{children}</>;
  }

  if (!isFetched) {
    return renderLoading();
  }

  if (status === 'error') {
    return renderError(error);
  }

  return null;
}
