
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Step } from "@/utils/stepHelpers";

export const useAuthFlow = () => {
  const { toast } = useToast();
  const { signIn, signUp } = useSupabaseAuth();
  const { createAdminUser } = useAdminAuth();

  const handleSignIn = useCallback(async (email: string, password: string) => {
    const success = await signIn(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      return true;
    } else {
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [signIn, toast]);

  const handleSignUp = useCallback(async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const user = await signUp(userData);
    if (user) {
      toast({
        title: "Account Created Successfully!",
        description: "You can now sign in with your credentials.",
      });
      return true;
    } else {
      toast({
        title: "Sign Up Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [signUp, toast]);

  const handleAdminSignUp = useCallback(async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const { user, error } = await createAdminUser(userData);
    if (user && !error) {
      toast({
        title: "Admin Account Created Successfully!",
        description: "You can now sign in with admin privileges.",
      });
      return true;
    } else {
      toast({
        title: "Admin Sign Up Failed",
        description: error || "There was an error creating your admin account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [createAdminUser, toast]);

  const handleResetPassword = useCallback(async (email: string) => {
    toast({
      title: "Password Reset",
      description: "Password reset functionality will be implemented soon.",
    });
    return true;
  }, [toast]);

  return {
    handleSignIn,
    handleSignUp,
    handleAdminSignUp,
    handleResetPassword
  };
};
