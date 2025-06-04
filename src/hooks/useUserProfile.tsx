
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "./useSupabaseAuth";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export const useUserProfile = () => {
  const { user, isSignedIn } = useSupabaseAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserProfile();
    } else {
      setProfile(null);
    }
  }, [isSignedIn, user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    refetch: fetchUserProfile
  };
};
