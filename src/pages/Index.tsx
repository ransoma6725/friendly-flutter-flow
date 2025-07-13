
import { useOptimizedBookingFlow } from "@/hooks/useOptimizedBookingFlow";
import { getStepInfo, isAuthStep } from "@/utils/stepHelpers";
import { useAuthHandlers } from "@/components/auth/AuthHandlers";
import AuthSection from "@/components/auth/AuthSection";
import BookingSection from "@/components/booking/BookingSection";
import PageHeader from "@/components/layout/PageHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const Index = () => {
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

  const {
    isSignedIn,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
    handleSignOut,
  } = useAuthHandlers(setStep);

  const { title, description } = getStepInfo(step);

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
          <PageHeader />

          {isAuthStep(step) ? (
            <AuthSection
              step={step}
              title={title}
              description={description}
              isSignedIn={isSignedIn}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onResetPassword={handleResetPassword}
              setStep={setStep}
            />
          ) : (
            <BookingSection
              step={step}
              title={title}
              description={description}
              progressPercentage={getProgressPercentage()}
              selectedBus={selectedBus}
              selectedSeatIds={selectedSeatIds}
              isSignedIn={isSignedIn}
              onSelectBus={handleSelectBus}
              onBookSeats={handleBookSeats}
              onPayment={handlePayment}
              onNewBooking={handleNewBooking}
              onGoHome={handleGoHome}
              onSignOut={handleSignOut}
              setStep={setStep}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
