
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

const Index = () => {
  const {
    selectedBus,
    isSignedIn,
    step,
    selectedSeatIds,
    getProgressPercentage,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
    handleSelectBus,
    handleBookSeats,
    handlePayment,
    handleNewBooking,
    handleSignOut,
    handleGoHome,
    setStep
  } = useOptimizedBookingFlow();

  const { title, description } = getStepInfo(step);

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
