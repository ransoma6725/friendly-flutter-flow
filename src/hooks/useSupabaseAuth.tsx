
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        } else {
          console.log("Initial session:", session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Handle email confirmation
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("User signed in successfully:", session.user.email);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error.message);
        return false;
      }
      
      if (data.user) {
        console.log("Sign in successful:", data.user.email);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: { 
    fullName: string; 
    phone: string; 
    email: string; 
    password: string 
  }): Promise<User | null> => {
    try {
      setIsLoading(true);
      console.log("Attempting to sign up user:", userData.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.fullName,
            phone: userData.phone,
          },
          emailRedirectTo: undefined // Disable email confirmation for now
        },
      });
      
      if (error) {
        console.error("Sign up error:", error.message);
        return null;
      }
      
      if (data.user) {
        console.log("Sign up successful:", data.user.email);
        console.log("User ID:", data.user.id);
        
        // If user is created but needs email confirmation
        if (!data.session && data.user && !data.user.email_confirmed_at) {
          console.log("User created but email confirmation required");
        }
        
        return data.user;
      }
      
      return null;
    } catch (error) {
      console.error("Sign up error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      console.log("Sign out successful");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    session,
    isLoading,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut
  };
};
