import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bus, User } from "@/types";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";
import { authenticateUser } from "@/services/authService";

export type AppState = "auth" | "signup" | "forgot-password" | "buses" | "seats" | "payment" | "confirmation";

export const useBookingFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [step, setStep] = useState<AppState>("auth");
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  // Check for existing user session on component mount
  useEffect(() => {
    const userAuth = localStorage.getItem("cambus_user_auth");
    if (userAuth) {
      try {
        const parsed = JSON.parse(userAuth);
        // Check if session is less than 24 hours old
        const isValid = parsed.timestamp && 
          (new Date().getTime() - parsed.timestamp) < 24 * 60 * 60 * 1000;
          
        if (isValid) {
          setIsSignedIn(true);
          setCurrentUser({
            id: parsed.userId,
            name: parsed.userName,
            email: parsed.userEmail
          });
          setStep("buses");
        } else {
          // Clear expired session
          localStorage.removeItem("cambus_user_auth");
        }
      } catch (e) {
        console.error("Failed to parse user auth from localStorage", e);
      }
    }
  }, []);

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
    // Use our auth service to authenticate the user
    const user = authenticateUser(email, password);
    
    if (user) {
      // Store user session in localStorage
      localStorage.setItem("cambus_user_auth", JSON.stringify({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().getTime()
      }));
      
      setCurrentUser(user);
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
    
    // Store user session in localStorage
    localStorage.setItem("cambus_user_auth", JSON.stringify({
      userId: mockUser.id,
      userName: mockUser.name,
      userEmail: mockUser.email,
      userPhone: mockUser.phone,
      timestamp: new Date().getTime()
    }));
    
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
    // Add the booking to our context
    if (currentUser && selectedBus) {
      const bookingId = addBooking({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        bus: selectedBus,
        seatIds: selectedSeatIds,
        totalAmount: selectedBus.price * selectedSeatIds.length,
        departureDate: new Date().toISOString(), // In a real app, this would be the actual departure date
      });
      
      setCurrentBookingId(bookingId);
    }
  
    setStep("confirmation");
    toast({
      title: "Payment initiated",
      description: "Your booking has been recorded! Awaiting payment confirmation.",
    });
  };

  const handleNewBooking = () => {
    // Reset the flow
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  };

  const handleGoToDashboard = () => {
    navigate("/user");
  };

  const handleSignOut = () => {
    localStorage.removeItem("cambus_user_auth");
    setIsSignedIn(false);
    setCurrentUser(null);
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("auth");
    
    // Redirect to home page
    navigate("/");
    
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
    currentBookingId,
    getProgressPercentage,
    handleSignIn,
    handleSignUp,
    handleResetPassword: (email: string) => {
      // Mock password reset - in a real app, this would send an email
      toast({
        title: "Password reset email sent",
        description: `Check your inbox at ${email} for instructions`,
      });
    },
    handleSelectBus,
    handleBookSeats,
    handlePayment,
    handleNewBooking,
    handleSignOut,
    handleGoToDashboard,
    setStep
  };
};

const handleSelectBus = (bus: Bus) => {
  return {
    selectedBus: bus,
    step: "seats" as AppState,
    toast: {
      title: "Bus selected",
      description: `You selected ${bus.name} from ${bus.from} to ${bus.to}`,
    }
  };
};

const handleBookSeats = (seatIds: string[]) => {
  return {
    selectedSeatIds: seatIds,
    step: "payment" as AppState,
    toast: {
      title: "Seats selected",
      description: `You selected ${seatIds.length} seats`,
    }
  };
};
