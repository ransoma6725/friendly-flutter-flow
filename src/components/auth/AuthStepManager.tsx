
import { useState } from "react";
import { Step } from "@/utils/stepHelpers";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import AdminSignUpForm from "@/components/AdminSignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

interface AuthStepManagerProps {
  currentStep: Step;
  onStepChange: (step: Step) => void;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
  onAdminSignUp: (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
  onResetPassword: (email: string) => Promise<void>;
}

const AuthStepManager = ({
  currentStep,
  onStepChange,
  onSignIn,
  onSignUp,
  onAdminSignUp,
  onResetPassword
}: AuthStepManagerProps) => {
  const renderAuthForm = () => {
    switch (currentStep) {
      case "auth":
        return (
          <SignInForm 
            onSignIn={onSignIn} 
            onCreateAccount={() => onStepChange("signup")}
            onCreateAdminAccount={() => onStepChange("admin-signup")}
            onForgotPassword={() => onStepChange("forgot-password")}
          />
        );
      
      case "signup":
        return (
          <SignUpForm 
            onSignUp={onSignUp}
            onBack={() => onStepChange("auth")}
          />
        );
      
      case "admin-signup":
        return (
          <AdminSignUpForm 
            onAdminSignUp={onAdminSignUp}
            onBack={() => onStepChange("auth")}
          />
        );
      
      case "forgot-password":
        return (
          <ForgotPasswordForm 
            onResetPassword={onResetPassword}
            onBack={() => onStepChange("auth")}
          />
        );
      
      default:
        return null;
    }
  };

  return <>{renderAuthForm()}</>;
};

export default AuthStepManager;
