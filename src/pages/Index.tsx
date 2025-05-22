
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { BusIcon, Info } from "lucide-react";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import BookingProgress from "@/components/BookingProgress";
import PaymentDetails from "@/components/PaymentDetails";
import BookingConfirmation from "@/components/BookingConfirmation";
import AuthContainer from "@/components/AuthContainer";
import { Link } from "react-router-dom";

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BusIcon className="h-7 w-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">
              CamBus <span className="text-primary">Ticketing</span>
            </h1>
          </div>
          
          <Link to="/about">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              About Us
            </Button>
          </Link>
        </div>

        {isSignedIn && !["auth", "signup", "forgot-password"].includes(step) && (
          <BookingProgress currentStep={step} progressPercentage={getProgressPercentage()} />
        )}
        
        {["auth", "signup", "forgot-password"].includes(step) ? (
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
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardContent className={`p-6 ${step === "confirmation" ? "text-center" : ""}`}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
              
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
              
              {isSignedIn && !["confirmation"].includes(step) && (
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="outline"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
