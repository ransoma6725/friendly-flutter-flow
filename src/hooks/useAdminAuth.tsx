
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createAdminUser = async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<{ user: User | null; error: string | null }> => {
    try {
      setIsLoading(true);
      console.log("Creating admin user:", userData.email);
      
      // First, create the user account
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.fullName,
            phone: userData.phone,
          },
          emailRedirectTo: undefined
        },
      });
      
      if (error) {
        console.error("Admin signup error:", error.message);
        return { user: null, error: error.message };
      }
      
      if (data.user) {
        console.log("Admin user created:", data.user.email);
        
        // Add the user to admin_users table
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert({
            id: data.user.id,
            email: userData.email
          });
          
        if (adminError) {
          console.error("Error adding to admin_users:", adminError.message);
          return { user: null, error: "Failed to create admin privileges. Please contact support." };
        }
        
        console.log("Admin privileges granted successfully");
        return { user: data.user, error: null };
      }
      
      return { user: null, error: "Failed to create user account" };
    } catch (error: any) {
      console.error("Admin signup error:", error);
      return { user: null, error: error.message || "An unexpected error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAdminUser,
    isLoading
  };
};
