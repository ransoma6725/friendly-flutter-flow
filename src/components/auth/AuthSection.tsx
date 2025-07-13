
import { ReactNode } from "react";
import AuthContainer from "@/components/AuthContainer";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { AppState } from "@/utils/stepHelpers";

interface AuthSectionProps {
  step: AppState;
  title: string;
  description: string;
  isSignedIn: boolean;
  onSignIn: (email: string, password: string) => void;
  onSignUp: (userData: { fullName: string; phone: string; email: string; password: string }) => void;
  onResetPassword: (email: string) => void;
  setStep: (step: AppState) => void;
}

const AuthSection = ({
  step,
  title,
  description,
  isSignedIn,
  onSignIn,
  onSignUp,
  onResetPassword,
  setStep,
}: AuthSectionProps) => {
  return (
    <AuthContainer title={title} description={description}>
      {step === "auth" && !isSignedIn && (
        <SignInForm 
          onSignIn={onSignIn} 
          onCreateAccount={() => setStep("signup")}
          onForgotPassword={() => setStep("forgot-password")}
        />
      )}
      
      {step === "signup" && (
        <SignUpForm 
          onSignUp={onSignUp}
          onBack={() => setStep("auth")}
        />
      )}
      
      {step === "forgot-password" && (
        <ForgotPasswordForm 
          onResetPassword={onResetPassword}
          onBack={() => setStep("auth")}
        />
      )}
    </AuthContainer>
  );
};

export default AuthSection;
