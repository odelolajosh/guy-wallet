import { Fallback } from '@/components/fallback';
import { AppLayout } from '@/components/layout/app-layout';
import { Authenticate } from '@/lib/auth';
import { lazyImport } from '@/lib/lazy-import';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { pathname, search } = useLocation();
  const from = `${pathname}${search}`;

  return (
    <Authenticate
      renderLoading={() => <Fallback className="min-h-screen" />}
      renderUnauthenticated={() => <Navigate to="/login" state={{ from }} />}
    >
      {children}
    </Authenticate>
  );
};

const { Home } = lazyImport(() => import('@/pages/home'), 'Home');
const { Wallet } = lazyImport(() => import('@/pages/wallet'), 'Wallet');

export const protectedRoutes = [
  {
    element: (
      <Protected>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </Protected>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'wallet', element: <Wallet /> },
    ]
  },
];
