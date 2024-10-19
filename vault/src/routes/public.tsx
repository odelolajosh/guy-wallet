/* eslint-disable react-refresh/only-export-components */
import { Fallback } from '@/components/fallback';
import { Spinner } from '@/components/ui/spinner';
import { AuthLoader } from '@/lib/auth';
import { lazyImport } from '@/lib/lazy-import';
import { Suspense, type PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Public: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthLoader
      renderLoading={() => <Fallback className="min-h-screen" />}
      renderUnauthenticated={() => <>{children}</>}
    >
      <Navigate to="/" />
    </AuthLoader>
  );
};

const App = () => {
  const fallback = (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
  return (
    <Suspense fallback={fallback}>
      <Outlet />
    </Suspense>
  );
};

const { Login } = lazyImport(() => import('@/pages/auth/login'), 'Login');
const { Register } = lazyImport(() => import('@/pages/auth/register'), 'Register');

export const publicRoutes = [
  // Authentication routes
  {
    element: (
      <Public>
        <App />
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