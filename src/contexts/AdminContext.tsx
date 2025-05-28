
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
    // Check if user is authenticated and is admin
    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user is in admin_users table
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.user.email)
          .single();
        
        if (adminUser) {
          setAdminAuth({
            isAdmin: true,
            adminEmail: session.user.email || null,
          });
        }
      }
    };

    checkAdminAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAdminAuth({
            isAdmin: false,
            adminEmail: null,
          });
        } else if (event === 'SIGNED_IN' && session?.user) {
          // Check if user is admin
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .single();
          
          if (adminUser) {
            setAdminAuth({
              isAdmin: true,
              adminEmail: session.user.email || null,
            });
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const adminLogin = (email: string) => {
    setAdminAuth({
      isAdmin: true,
      adminEmail: email,
    });
  };

  const adminLogout = async () => {
    await supabase.auth.signOut();
    setAdminAuth({
      isAdmin: false,
      adminEmail: null,
    });
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
