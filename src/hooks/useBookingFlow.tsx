
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/contexts/BookingContext";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { transformSupabaseUser } from "@/types/auth";
import { Bus } from "@/types";
import { Step } from "@/utils/stepHelpers";

export const useBookingFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { user } = useSupabaseAuth();
  
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const currentUser = user ? transformSupabaseUser(user) : null;

  const handleSelectBus = useCallback((bus: Bus) => {
    setSelectedBus(bus);
    toast({
      title: "Bus selected",
      description: `You selected ${bus.name} from ${bus.from} to ${bus.to}`,
    });
  }, [toast]);

  const handleBookSeats = useCallback((seatIds: string[]) => {
    setSelectedSeatIds(seatIds);
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

    toast({
      title: "Payment initiated",
      description: "Your booking has been recorded! Awaiting payment confirmation.",
    });
  }, [currentUser, selectedBus, selectedSeatIds, addBooking, toast]);

  const handleNewBooking = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
    navigate("/");
  }, [navigate]);

  return {
    selectedBus,
    selectedSeatIds,
    currentBookingId,
    handleSelectBus,
    handleBookSeats,
    handlePayment,
    handleNewBooking,
    handleGoHome
  };
};
