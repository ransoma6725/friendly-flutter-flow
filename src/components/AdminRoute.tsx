
import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { adminAuth } = useAdmin();
  const location = useLocation();

  if (!adminAuth.isAdmin) {
    // Redirect to admin login if not authenticated as admin
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
