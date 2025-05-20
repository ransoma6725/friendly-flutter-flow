
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bus, User } from "@/types";

export type AppState = "auth" | "signup" | "forgot-password" | "buses" | "seats" | "payment" | "confirmation";

export const useBookingFlow = () => {
  const { toast } = useToast();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [step, setStep] = useState<AppState>("auth");
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Calculate progress percentage based on step
  const getProgressPercentage = () => {
    switch(step) {
      case "auth": 
      case "signup": 
      case "forgot-password": return 25;
      case "buses": return 50;
      case "seats": return 75;
      case "payment": 
      case "confirmation": return 100;
      default: return 0;
    }
  };

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - in a real app, this would connect to your auth service
    if (email && password) {
      // Mock user data - in a real app this would come from your auth system
      const mockUser: User = {
        id: "user-1",
        name: "John Doe",
        email: email
      };
      
      setCurrentUser(mockUser);
      setIsSignedIn(true);
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
  };

  const handleSignUp = (userData: { fullName: string; phone: string; email: string; password: string }) => {
    // Mock user registration - in a real app, this would connect to your auth service
    const mockUser: User = {
      id: `user-${Date.now().toString(36)}`,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone
    };
    
    setCurrentUser(mockUser);
    setIsSignedIn(true);
    setStep("buses");
    toast({
      title: "Account created successfully",
      description: "Welcome to CamBus Ticketing System!",
    });
  };

  const handleResetPassword = (email: string) => {
    // Mock password reset - in a real app, this would send an email
    toast({
      title: "Password reset email sent",
      description: `Check your inbox at ${email} for instructions`,
    });
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setStep("seats");
    toast({
      title: "Bus selected",
      description: `You selected ${bus.name} from ${bus.from} to ${bus.to}`,
    });
  };

  const handleBookSeats = (seatIds: string[]) => {
    setSelectedSeatIds(seatIds);
    setStep("payment");
    toast({
      title: "Seats selected",
      description: `You selected ${seatIds.length} seats`,
    });
  };

  const handlePayment = () => {
    setStep("confirmation");
    toast({
      title: "Payment successful",
      description: "Your booking has been confirmed!",
    });
  };

  const handleNewBooking = () => {
    // Reset the flow
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setCurrentUser(null);
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("auth");
    toast({
      title: "Signed out successfully",
      description: "You have been logged out",
    });
  };

  return {
    selectedBus,
    isSignedIn,
    currentUser,
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
  };
};
