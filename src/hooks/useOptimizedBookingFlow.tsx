
import { useState, useCallback } from "react";
import { Bus } from "@/types";
import { AppState } from "@/utils/stepHelpers";

export const useOptimizedBookingFlow = () => {
  // Initialize with auth step to ensure sign-in is visible
  const [step, setStep] = useState<AppState>("auth");
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const getProgressPercentage = useCallback(() => {
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
  }, [step]);

  const handleSelectBus = useCallback((bus: Bus) => {
    setSelectedBus(bus);
    setStep("seats");
  }, []);

  const handleBookSeats = useCallback((seatIds: string[]) => {
    setSelectedSeatIds(seatIds);
    setStep("payment");
  }, []);

  const handlePayment = useCallback(() => {
    setStep("confirmation");
  }, []);

  const handleNewBooking = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  }, []);

  return {
    step,
    selectedBus,
    selectedSeatIds,
    getProgressPercentage,
    handleSelectBus,
    handleBookSeats,
    handlePayment,
    handleNewBooking,
    handleGoHome,
    setStep
  };
};
