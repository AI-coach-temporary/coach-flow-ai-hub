
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, isDemoMode } = useAuth();
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  // Allow access if the user is logged in OR demo mode is enabled
  if (user || isDemoMode) {
    return <>{children}</>;
  }
  
  return <Navigate to="/login" replace />;
};

export default AuthGuard;
