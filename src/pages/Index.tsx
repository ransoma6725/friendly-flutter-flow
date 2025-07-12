
import { useState } from "react";
import { Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthContainer from "@/components/AuthContainer";
import Header from "@/components/layout/Header";
import BookingSteps from "@/components/booking/BookingSteps";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AuthStepManager from "@/components/auth/AuthStepManager";
import BookingStepManager from "@/components/booking/BookingStepManager";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { getStepInfo, isAuthStep, getProgressPercentage, Step } from "@/utils/stepHelpers";

const Index = () => {
  const { user, isSignedIn, signOut, isLoading } = useSupabaseAuth();
  const { handleSignIn, handleSignUp, handleAdminSignUp, handleResetPassword } = useAuthFlow();
  const { selectedBus, selectedSeatIds, handleSelectBus, handleBookSeats, handlePayment, handleNewBooking, handleGoHome } = useBookingFlow();
  
  const [step, setStep] = useState<Step>(isSignedIn ? "buses" : "auth");

  const { title, description } = getStepInfo(step);

  const onSignInSuccess = async (email: string, password: string) => {
    const success = await handleSignIn(email, password);
    if (success) {
      setStep("buses");
    }
  };

  const onSignUpSuccess = async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const success = await handleSignUp(userData);
    if (success) {
      setStep("auth");
    }
  };

  const onAdminSignUpSuccess = async (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    const success = await handleAdminSignUp(userData);
    if (success) {
      setStep("auth");
    }
  };

  const onSelectBus = (bus: any) => {
    handleSelectBus(bus);
    setStep("seats");
  };

  const onBookSeats = (seatIds: string[]) => {
    handleBookSeats(seatIds);
    setStep("payment");
  };

  const onPayment = () => {
    handlePayment();
    setStep("confirmation");
  };

  const onNewBooking = () => {
    handleNewBooking();
    setStep("buses");
  };

  const onGoHome = () => {
    handleGoHome();
    setStep("auth");
  };

  const handleSignOut = async () => {
    await signOut();
    setStep("auth");
  };

  // Show loading while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Redirect to auth if not signed in and not on auth step
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
              <AuthStepManager
                currentStep={step}
                onStepChange={setStep}
                onSignIn={onSignInSuccess}
                onSignUp={onSignUpSuccess}
                onAdminSignUp={onAdminSignUpSuccess}
                onResetPassword={handleResetPassword}
              />
            </AuthContainer>
          ) : (
            <BookingSteps
              step={step}
              title={title}
              description={description}
              progressPercentage={getProgressPercentage(step)}
            >
              <BookingStepManager
                currentStep={step}
                selectedBus={selectedBus}
                selectedSeatIds={selectedSeatIds}
                onStepChange={setStep}
                onSelectBus={onSelectBus}
                onBookSeats={onBookSeats}
                onPayment={onPayment}
                onNewBooking={onNewBooking}
                onGoHome={onGoHome}
              />
              
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
