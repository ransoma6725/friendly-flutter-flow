
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { BusIcon } from "lucide-react";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import BookingProgress from "@/components/BookingProgress";
import PaymentDetails from "@/components/PaymentDetails";
import BookingConfirmation from "@/components/BookingConfirmation";

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
    setStep
  } = useBookingFlow();

  // Helper function to get title and description based on current step
  const getStepInfo = () => {
    switch(step) {
      case "auth":
        return { title: "CamBus Ticketing System", description: "Sign in to book your bus tickets easily" };
      case "signup":
        return { title: "Create Account", description: "Register to access our bus ticketing services" };
      case "forgot-password":
        return { title: "Reset Password", description: "Recover access to your account" };
      case "buses":
        return { title: "Select Your Route", description: "Browse available buses and routes" };
      case "seats":
        return { title: "Choose Your Seats", description: "Select your preferred seats" };
      case "payment":
        return { title: "Payment Details", description: "Complete your payment to confirm booking" };
      case "confirmation":
        return { title: "Booking Confirmed", description: "Your ticket has been booked successfully" };
      default:
        return { title: "", description: "" };
    }
  };

  const { title, description } = getStepInfo();

  return (
    <div className="min-h-screen p-4 bg-hero-pattern">
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BusIcon className="h-7 w-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            CamBus <span className="text-primary">Ticketing</span>
          </h1>
        </div>

        {isSignedIn && !["auth", "signup", "forgot-password"].includes(step) && (
          <BookingProgress currentStep={step} progressPercentage={getProgressPercentage()} />
        )}
        
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className={step === "confirmation" ? "text-center" : ""}>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          
          <CardContent>
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
              />
            )}
          </CardContent>
          
          {isSignedIn && !["auth", "signup", "forgot-password", "confirmation"].includes(step) && (
            <CardFooter>
              <Button 
                variant="outline"
                onClick={handleSignOut}
                className="w-full"
              >
                Sign Out
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
