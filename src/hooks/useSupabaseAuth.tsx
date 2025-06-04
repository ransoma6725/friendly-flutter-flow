
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error.message);
        return false;
      }
      
      console.log("Sign in successful:", data.user?.email);
      return !!data.user;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    }
  };

  const signUp = async (userData: { 
    fullName: string; 
    phone: string; 
    email: string; 
    password: string 
  }): Promise<User | null> => {
    try {
      console.log("Attempting to sign up user:", userData.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.fullName,
            phone: userData.phone,
          },
          emailRedirectTo: `${window.location.origin}/`
        },
      });
      
      if (error) {
        console.error("Sign up error:", error.message);
        return null;
      }
      
      console.log("Sign up successful:", data.user?.email);
      return data.user;
    } catch (error) {
      console.error("Sign up error:", error);
      return null;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sign out successful");
    } catch (error) {
      console.error("Sign out error:", error);
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
