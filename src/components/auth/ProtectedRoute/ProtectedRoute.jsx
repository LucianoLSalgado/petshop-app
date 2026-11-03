import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/hooks';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <p className="container-custom py-8 text-gray-600">
        Verificando sessão...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
