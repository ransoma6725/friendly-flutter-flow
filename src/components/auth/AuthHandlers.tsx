
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { transformSupabaseUser } from "@/types/auth";
import { AppState } from "@/utils/stepHelpers";

export const useAuthHandlers = (setStep: (step: AppState) => void) => {
  const { toast } = useToast();
  const { user, isSignedIn, signIn, signUp, signOut, isLoading } = useSupabaseAuth();

  const handleSignIn = async (email: string, password: string) => {
    const success = await signIn(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      setStep("buses");
    } else {
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const newUser = await signUp(userData);
    if (newUser) {
      toast({
        title: "Account Created Successfully!",
        description: "You can now sign in with your credentials.",
      });
      setStep("auth");
    } else {
      toast({
        title: "Sign Up Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (email: string) => {
    toast({
      title: "Password Reset",
      description: "Password reset functionality will be implemented soon.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    setStep("auth");
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  return {
    user: user ? transformSupabaseUser(user) : null,
    isSignedIn,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
    handleSignOut,
  };
};
