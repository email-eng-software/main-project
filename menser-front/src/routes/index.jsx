import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Message from "../screens/Message";


function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
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
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes;