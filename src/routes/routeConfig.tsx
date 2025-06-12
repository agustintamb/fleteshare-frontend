//import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Guards
import { PrivateRoute, PublicOnlyRoute } from '@/components/RouteGuards';

// Eager loaded pages
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RecoverPassword from '@/pages/auth/RecoverPassword';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
//import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy loaded pages
//const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
//const FreightRequests = React.lazy(() => import('@/pages/freight/FreightRequests'));
//const FreightDetails = React.lazy(() => import('@/pages/freight/FreightDetails'));
//const NewFreightRequest = React.lazy(() => import('@/pages/freight/NewFreightRequest'));
//const Profile = React.lazy(() => import('@/pages/Profile'));
//const Chat = React.lazy(() => import('@/pages/Chat'));

//const withSuspense = (Component: React.ComponentType) => (
//  <Suspense fallback={<LoadingSpinner />}>
//    <Component />
//  </Suspense>
//);

export const routeConfig: RouteObject[] = [
  // Public routes
  {
    path: '/',
    element: <MainLayout isLanding />,
    children: [
      { index: true, element: <Home /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
    ],
  },

  // Auth routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'recover-password',
        element: (
          <PublicOnlyRoute>
            <RecoverPassword />
          </PublicOnlyRoute>
        ),
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
      //{ path: 'dashboard', element: withSuspense(Dashboard) },
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
