import { Fallback } from '@/components/fallback';
import { AuthLoader } from '@/lib/auth';
import { lazyImport } from '@/lib/lazy-import';
import { Suspense } from 'react';
import { Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { pathname, search } = useLocation();
  const from = `${pathname}${search}`;

  return (
    <AuthLoader
      renderLoading={() => <Fallback className="min-h-screen" />}
      renderUnauthenticated={() => <Navigate to="/login" state={{ from }} />}
    >
      {children}
    </AuthLoader>
  );
};

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Fallback className="min-h-screen" />}>
      {children}
      <ScrollRestoration />
    </Suspense>
  );
};

const { Home } = lazyImport(() => import('@/pages/home'), 'Home');

export const protectedRoutes = [
  {
    element: (
      <Protected>
        <App>
          <Outlet />
        </App>
      </Protected>
    ),
    children: [
      { index: true, element: <Home /> },
    ]
  },
];
