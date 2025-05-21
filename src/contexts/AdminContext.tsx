
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AdminAuthState {
  isAdmin: boolean;
  adminEmail: string | null;
}

interface AdminContextType {
  adminAuth: AdminAuthState;
  adminLogin: (email: string) => void;
  adminLogout: () => void;
}

const initialState: AdminAuthState = {
  isAdmin: false,
  adminEmail: null,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminAuth, setAdminAuth] = useState<AdminAuthState>(initialState);

  // Load admin auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("cambus_admin_auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        // Check if admin session is less than 24 hours old
        const isValid = parsed.timestamp && 
          (new Date().getTime() - parsed.timestamp) < 24 * 60 * 60 * 1000;
          
        if (isValid) {
          setAdminAuth({
            isAdmin: parsed.isAdmin || false,
            adminEmail: parsed.adminEmail || null,
          });
        } else {
          // Clear expired admin session
          localStorage.removeItem("cambus_admin_auth");
        }
      } catch (e) {
        console.error("Failed to parse admin auth from localStorage", e);
      }
    }
  }, []);

  const adminLogin = (email: string) => {
    const newState = {
      isAdmin: true,
      adminEmail: email,
    };
    setAdminAuth(newState);
    localStorage.setItem("cambus_admin_auth", JSON.stringify({
      ...newState,
      timestamp: new Date().getTime()
    }));
  };

  const adminLogout = () => {
    setAdminAuth(initialState);
    localStorage.removeItem("cambus_admin_auth");
  };

  return (
    <AdminContext.Provider value={{ adminAuth, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
