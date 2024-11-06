/* eslint-disable react-refresh/only-export-components */
import { Fallback } from '@/components/fallback';
import { PlainLayout } from '@/components/layout/plain-layout';
import { Authenticate } from '@/lib/auth';
import { lazyImport } from '@/lib/lazy-import';
import { type PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Public: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Authenticate
      renderLoading={() => <Fallback className="min-h-screen" />}
      renderUnauthenticated={() => <>{children}</>}
    >
      <Navigate to="/" />
    </Authenticate>
  );
};

const { Login } = lazyImport(() => import('@/pages/auth/login'), 'Login');
const { Register } = lazyImport(() => import('@/pages/auth/register'), 'Register');

export const publicRoutes = [
  // Authentication routes
  {
    element: (
      <Public>
        <PlainLayout>
          <Outlet />
        </PlainLayout>
      </Public>
    ),
    children: [
      {
        element: <Outlet />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/create-account', element: <Register /> }
        ]
      },
    ]
  },
];