
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface UserRouteProps {
  children: ReactNode;
}

const UserRoute = ({ children }: UserRouteProps) => {
  const { isSignedIn, isLoading } = useSupabaseAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default UserRoute;
