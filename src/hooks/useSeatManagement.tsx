
import { useState, useEffect } from "react";
import { Seat } from "@/types";

interface UseSeatManagementProps {
  busId: string;
  totalSeats: number;
}

export const useSeatManagement = ({ busId, totalSeats }: UseSeatManagementProps) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = useState<Set<string>>(new Set());

  // Load booked seats from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem(`bus_${busId}_booked_seats`);
    if (savedBookings) {
      const parsed = JSON.parse(savedBookings);
      setBookedSeats(new Set(parsed));
    }
  }, [busId]);

  // Generate seats with booking status
  useEffect(() => {
    const generateSeats = () => {
      const seatList: Seat[] = [];
      const rows = Math.ceil(totalSeats / 4);
      
      for (let row = 1; row <= rows; row++) {
        const seatsInRow = Math.min(4, totalSeats - (row - 1) * 4);
        const seatLetters = ['A', 'B', 'C', 'D'];
        
        for (let seatIndex = 0; seatIndex < seatsInRow; seatIndex++) {
          const seatNumber = `${row}${seatLetters[seatIndex]}`;
          const seatId = `${busId}-${seatNumber}`;
          
          seatList.push({
            id: seatId,
            number: seatNumber,
            isBooked: bookedSeats.has(seatId),
            isSelected: false
          });
        }
      }
      
      return seatList;
    };

    setSeats(generateSeats());
  }, [busId, totalSeats, bookedSeats]);

  const bookSeats = (seatIds: string[]) => {
    const newBookedSeats = new Set([...bookedSeats, ...seatIds]);
    setBookedSeats(newBookedSeats);
    
    // Save to localStorage
    localStorage.setItem(`bus_${busId}_booked_seats`, JSON.stringify([...newBookedSeats]));
    
    // Update seats state
    setSeats(prevSeats => 
      prevSeats.map(seat => ({
        ...seat,
        isBooked: newBookedSeats.has(seat.id),
        isSelected: false
      }))
    );
  };

  const cancelSeatBooking = (seatIds: string[]) => {
    const newBookedSeats = new Set(bookedSeats);
    seatIds.forEach(seatId => newBookedSeats.delete(seatId));
    setBookedSeats(newBookedSeats);
    
    // Save to localStorage
    localStorage.setItem(`bus_${busId}_booked_seats`, JSON.stringify([...newBookedSeats]));
    
    // Update seats state
    setSeats(prevSeats => 
      prevSeats.map(seat => ({
        ...seat,
        isBooked: newBookedSeats.has(seat.id)
      }))
    );
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
    bookSeats,
    cancelSeatBooking,
    toggleSeatSelection,
    getSelectedSeats,
    clearSelection
  };
};
