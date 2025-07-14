
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthState {
  isAdmin: boolean;
  adminEmail: string | null;
}

interface AdminContextType {
  adminAuth: AdminAuthState;
  adminLogin: (email: string) => void;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [adminAuth, setAdminAuth] = useState<AdminAuthState>({
    isAdmin: false,
    adminEmail: null,
  });

  useEffect(() => {
    // Check localStorage for existing admin session
    const storedAdminAuth = localStorage.getItem('adminAuth');
    if (storedAdminAuth) {
      try {
        const parsedAuth = JSON.parse(storedAdminAuth);
        if (parsedAuth.isAdmin && parsedAuth.adminEmail) {
          setAdminAuth(parsedAuth);
        }
      } catch (error) {
        console.error('Error parsing stored admin auth:', error);
        localStorage.removeItem('adminAuth');
      }
    }
  }, []);

  const adminLogin = (email: string) => {
    console.log("Setting admin login for:", email);
    const newAdminAuth = {
      isAdmin: true,
      adminEmail: email,
    };
    
    setAdminAuth(newAdminAuth);
    // Store in localStorage for persistence
    localStorage.setItem('adminAuth', JSON.stringify(newAdminAuth));
  };

  const adminLogout = async () => {
    console.log("Logging out admin");
    setAdminAuth({
      isAdmin: false,
      adminEmail: null,
    });
    // Clear localStorage
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminContext.Provider value={{ adminAuth, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
