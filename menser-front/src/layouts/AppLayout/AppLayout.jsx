import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Toast from '../../components/Toast';

import { useRefreshToken } from '../../hooks/query/sessions';

export default function AppLayout() {
  const { isInitialLoading } = useRefreshToken();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll page to top when it is opened
  }, [pathname]);

  if (isInitialLoading) return <h1>Carregando...</h1>;
  return (
    <div>
      <Toast />
      <Outlet />
    </div>
  );
}
