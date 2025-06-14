import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.DASHBOARD} replace />;
};

export default PublicOnlyRoute;
