import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Guards
import PrivateRoute from '@/components/guards/PrivateRoute';

// Eager loaded pages
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

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
      //{ path: 'profile', element: withSuspense(Profile) },
      //{ path: 'chat/:id', element: withSuspense(Chat) },
      //{
      //  path: 'freight',
      //  children: [
      //    { index: true, element: withSuspense(FreightRequests) },
      //    { path: 'new', element: withSuspense(NewFreightRequest) },
      //    { path: ':id', element: withSuspense(FreightDetails) },
      //  ],
      //},
    ],
  },

  // Catch all
  { path: '*', element: <NotFound /> },
];
