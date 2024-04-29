import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Message from './screens/Message';
import NewMessage from './screens/NewMessage';
import useAuthStore from './stores/auth';
import Header from './components/Header';
import AppLayout from './layouts/AppLayout/AppLayout';

function PrivateRoutes() {
  const auth = useAuthStore((state) => state.auth);
  const { pathname: from } = useLocation();

  return !auth ? (
    <Navigate to="/signIn" state={{ from }} />
  ) : (
    <div className="h-screen relative">
      <Header>
        <Outlet />
      </Header>
    </div>
  );
}

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          element: <PrivateRoutes />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: '/draft/:messageId',
              element: <NewMessage />,
            },
            {
              path: '/message/:messageId',
              element: <Message />,
            },
          ],
        },
        {
          path: '/signIn',
          element: <SignIn />,
        },
        {
          path: '/signUp',
          element: <SignUp />,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoutes;
