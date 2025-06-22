import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';

import PrivateRoute from '@/components/guards/PrivateRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import NewFreightRequest from '@/pages/Freight/new';
import FreightRequests from '@/pages/Freight/requests';
import { FreightDetails } from '@/pages/Freight/details';
import Profile from '@/pages/Profile';
import Notifications from '@/pages/Notifications';
import NotFound from '@/pages/NotFound';

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

export const routeConfig: RouteObject[] = [
  // Public routes - Landing with auth modals
  {
    path: '/',
    element: <MainLayout isLanding />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Auth routes as modals over landing
      {
        path: 'iniciar-sesion',
        element: <Home authModal="login" />,
      },
      {
        path: 'crear-cuenta',
        element: <Home authModal="register" />,
      },
      {
        path: 'recuperar-cuenta',
        element: <Home authModal="recover" />,
      },
    ],
  },

  // Private routes
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'dashboard', element: withSuspense(Dashboard) },
      { path: 'notificaciones', element: withSuspense(Notifications) },
      { path: 'mi-perfil', element: withSuspense(Profile) },
      {
        path: 'fletes',
        children: [
          { index: true, element: withSuspense(FreightRequests) },
          { path: 'nuevo', element: withSuspense(NewFreightRequest) },
          { path: ':id', element: withSuspense(FreightDetails) },
        ],
      },
    ],
  },

  // Catch all
  { path: '*', element: <NotFound /> },
];
