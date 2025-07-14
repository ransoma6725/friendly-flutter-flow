
import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { adminAuth } = useAdmin();
  const location = useLocation();

  console.log("AdminRoute - Current admin auth state:", adminAuth);

  if (!adminAuth.isAdmin) {
    console.log("AdminRoute - Redirecting to admin login");
    // Redirect to admin login if not authenticated as admin
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log("AdminRoute - Admin authenticated, rendering dashboard");
  return <>{children}</>;
};

export default AdminRoute;
