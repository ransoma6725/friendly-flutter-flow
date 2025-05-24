
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/hooks/useAuth";
import { Bus } from "@/types";
import { AppState, getProgressPercentage } from "@/utils/stepHelpers";

export const useOptimizedBookingFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { isSignedIn, currentUser, signIn, signUp, signOut } = useAuth();
  
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [step, setStep] = useState<AppState>(isSignedIn ? "buses" : "auth");
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const handleSignIn = useCallback((email: string, password: string) => {
    const success = signIn(email, password);
    
    if (success) {
      setStep("buses");
      toast({
        title: "Signed in successfully",
        description: "Welcome to CamBus Ticketing System!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  }, [signIn, toast]);

  const handleSignUp = useCallback((userData: { fullName: string; phone: string; email: string; password: string }) => {
    signUp(userData);
    setStep("buses");
    toast({
      title: "Account created successfully",
      description: "Welcome to CamBus Ticketing System!",
    });
  }, [signUp, toast]);

  const handleResetPassword = useCallback((email: string) => {
    toast({
      title: "Password reset email sent",
      description: `Check your inbox at ${email} for instructions`,
    });
  }, [toast]);

  const handleSelectBus = useCallback((bus: Bus) => {
    setSelectedBus(bus);
    setStep("seats");
    toast({
      title: "Bus selected",
      description: `You selected ${bus.name} from ${bus.from} to ${bus.to}`,
    });
  }, [toast]);

  const handleBookSeats = useCallback((seatIds: string[]) => {
    setSelectedSeatIds(seatIds);
    setStep("payment");
    toast({
      title: "Seats selected",
      description: `You selected ${seatIds.length} seats`,
    });
  }, [toast]);

  const handlePayment = useCallback(() => {
    if (currentUser && selectedBus) {
      const bookingId = addBooking({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        bus: selectedBus,
        seatIds: selectedSeatIds,
        totalAmount: selectedBus.price * selectedSeatIds.length,
        departureDate: new Date().toISOString(),
      });
      
      setCurrentBookingId(bookingId);
    }
  
    setStep("confirmation");
    toast({
      title: "Payment initiated",
      description: "Your booking has been recorded! Awaiting payment confirmation.",
    });
  }, [currentUser, selectedBus, selectedSeatIds, addBooking, toast]);

  const handleNewBooking = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("auth");
    navigate("/");
    
    toast({
      title: "Signed out successfully",
      description: "You have been logged out",
    });
  }, [signOut, navigate, toast]);

  const handleGoHome = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("auth");
    navigate("/");
  }, [navigate]);

  return {
    selectedBus,
    isSignedIn,
    currentUser,
    step,
    selectedSeatIds,
    currentBookingId,
    getProgressPercentage: () => getProgressPercentage(step),
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
  };
};
