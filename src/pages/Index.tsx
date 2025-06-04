
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Info, Shield } from "lucide-react";
import PaymentDetails from "@/components/PaymentDetails";
import BookingConfirmation from "@/components/BookingConfirmation";
import AuthContainer from "@/components/AuthContainer";
import Header from "@/components/layout/Header";
import BookingSteps from "@/components/booking/BookingSteps";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useOptimizedBookingFlow } from "@/hooks/useOptimizedBookingFlow";
import { getStepInfo, isAuthStep } from "@/utils/stepHelpers";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const { user, isSignedIn, signIn, signUp, signOut } = useSupabaseAuth();
  
  const {
    selectedBus,
    step,
    selectedSeatIds,
    getProgressPercentage,
    handleSelectBus,
    handleBookSeats,
    handlePayment,
    handleNewBooking,
    handleGoHome,
    setStep
  } = useOptimizedBookingFlow();

  const { title, description } = getStepInfo(step);

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
    const user = await signUp(userData);
    if (user) {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
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

  if (!isSignedIn && !isAuthStep(step)) {
    setStep("auth");
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen p-2 md:p-4 bg-hero-pattern">
        <div className="max-w-4xl mx-auto py-4 md:py-6">
          <Header>
            <Link to="/about">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">About Us</span>
              </Button>
            </Link>
            
            {isSignedIn && (
              <Link to="/admin/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
            )}
          </Header>

          {isAuthStep(step) ? (
            <AuthContainer title={title} description={description}>
              {step === "auth" && !isSignedIn && (
                <SignInForm 
                  onSignIn={handleSignIn} 
                  onCreateAccount={() => setStep("signup")}
                  onForgotPassword={() => setStep("forgot-password")}
                />
              )}
              
              {step === "signup" && (
                <SignUpForm 
                  onSignUp={handleSignUp}
                  onBack={() => setStep("auth")}
                />
              )}
              
              {step === "forgot-password" && (
                <ForgotPasswordForm 
                  onResetPassword={handleResetPassword}
                  onBack={() => setStep("auth")}
                />
              )}
            </AuthContainer>
          ) : (
            <BookingSteps
              step={step}
              title={title}
              description={description}
              progressPercentage={getProgressPercentage()}
            >
              {step === "buses" && (
                <BusList buses={buses} onSelectBus={handleSelectBus} />
              )}
              
              {step === "seats" && selectedBus && (
                <SeatSelection 
                  bus={selectedBus} 
                  onBookSeats={handleBookSeats} 
                  onBack={() => setStep("buses")}
                />
              )}
              
              {step === "payment" && selectedBus && (
                <PaymentDetails 
                  bus={selectedBus}
                  selectedSeatIds={selectedSeatIds}
                  onPayment={handlePayment}
                  onBack={() => setStep("seats")}
                />
              )}
              
              {step === "confirmation" && selectedBus && (
                <BookingConfirmation
                  bus={selectedBus}
                  selectedSeatIds={selectedSeatIds}
                  onNewBooking={handleNewBooking}
                  onGoHome={handleGoHome}
                />
              )}
              
              {isSignedIn && !["confirmation"].includes(step) && (
                <div className="mt-4 md:mt-6 flex justify-end">
                  <Button 
                    variant="outline"
                    onClick={handleSignOut}
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </BookingSteps>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
