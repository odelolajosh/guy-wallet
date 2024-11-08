import { Fallback } from '@/components/fallback';
import { AppLayout } from '@/components/layout/app-layout';
import { PlainLayout } from '@/components/layout/plain-layout';
import { useWallets } from '@/data/wallets/get-wallets';
import { Authenticate } from '@/lib/auth';
import { lazyImport } from '@/lib/lazy-import';
import { CreateProfile } from '@/pages/onboarding/create-profile';
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

const RequireWallet = ({ children }: { children: React.ReactNode }) => {
  const { data: wallets, status } = useWallets();

  if (status === 'pending') {
    return <Fallback className="min-h-screen" />;
  }

  if (status === 'error' || wallets.length == 0) {
    return <Navigate to="/create-profile" replace />;
  }

  return children;
}

const { Home } = lazyImport(() => import('@/pages/home'), 'Home');
const { Wallet } = lazyImport(() => import('@/pages/wallet'), 'Wallet');

export const protectedRoutes = [
  {
    element: (
      <Protected>
        <RequireWallet>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </RequireWallet>
      </Protected>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'wallet', element: <Wallet /> },
    ]
  },
  {
    element: (
      <Protected>
        <PlainLayout>
          <Outlet />
        </PlainLayout>
      </Protected>
    ),
    children: [
      { path: 'create-profile', element: <CreateProfile /> },
    ]
  }
];
