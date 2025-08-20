
import { useState, useEffect } from "react";
import { Seat } from "@/types";
import { SeatService } from "@/services/seatService";
import { useToast } from "@/hooks/use-toast";

interface UseSeatManagementProps {
  busId: string;
  totalSeats: number;
}

export const useSeatManagement = ({ busId, totalSeats }: UseSeatManagementProps) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load seats from Supabase
  useEffect(() => {
    const loadSeats = async () => {
      try {
        setIsLoading(true);
        const seatsData = await SeatService.getSeatsForBus(busId);
        
        // If no seats exist, create them
        if (seatsData.length === 0) {
          await SeatService.createSeatsForBus(busId, totalSeats);
          const newSeatsData = await SeatService.getSeatsForBus(busId);
          setSeats(newSeatsData);
        } else {
          setSeats(seatsData);
        }
      } catch (error) {
        console.error('Error loading seats:', error);
        toast({
          title: "Error",
          description: "Failed to load seat information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSeats();
  }, [busId, totalSeats, toast]);

  const bookSeats = async (seatIds: string[]) => {
    try {
      await SeatService.bookSeats(seatIds);
      
      // Update local state
      setSeats(prevSeats => 
        prevSeats.map(seat => ({
          ...seat,
          isBooked: seatIds.includes(seat.id) ? true : seat.isBooked,
          isSelected: false
        }))
      );
    } catch (error) {
      console.error('Error booking seats:', error);
      toast({
        title: "Error",
        description: "Failed to book seats",
        variant: "destructive",
      });
      throw error;
    }
  };

  const cancelSeatBooking = async (seatIds: string[]) => {
    try {
      await SeatService.cancelSeatBooking(seatIds);
      
      // Update local state
      setSeats(prevSeats => 
        prevSeats.map(seat => ({
          ...seat,
          isBooked: seatIds.includes(seat.id) ? false : seat.isBooked
        }))
      );
    } catch (error) {
      console.error('Error cancelling seat booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel seat booking",
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggleSeatSelection = (seatId: string) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatId && !seat.isBooked
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const getSelectedSeats = () => {
    return seats.filter(seat => seat.isSelected);
  };

  const clearSelection = () => {
    setSeats(prevSeats => 
      prevSeats.map(seat => ({ ...seat, isSelected: false }))
    );
  };

  return {
    seats,
    isLoading,
    bookSeats,
    cancelSeatBooking,
    toggleSeatSelection,
    getSelectedSeats,
    clearSelection
  };
};
