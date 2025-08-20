
import { Seat } from "@/types";

export const groupSeatsByRow = (seats: Seat[]): Record<string, Seat[]> => {
  return seats.reduce((acc, seat) => {
    const rowNum = seat.number.slice(0, -1);
    if (!acc[rowNum]) acc[rowNum] = [];
    acc[rowNum].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
};

export const getSeatDisplayClasses = (seat: Seat): string => {
  const baseClasses = `
    flex items-center justify-center p-2 rounded-md cursor-pointer text-xs font-medium
    relative transition-all duration-200 ease-in-out transform hover:scale-105
  `;

  if (seat.isBooked) {
    return `${baseClasses} bg-gray-400 text-gray-100 cursor-not-allowed opacity-70`;
  }
  
  if (seat.isSelected) {
    return `${baseClasses} bg-primary text-primary-foreground shadow-md`;
  }
  
  return `${baseClasses} bg-white border border-gray-300 hover:border-primary hover:shadow-sm`;
};

export const formatSelectedSeats = (seats: Seat[]): string => {
  const selectedSeats = seats.filter(seat => seat.isSelected);
  return selectedSeats.length > 0 
    ? selectedSeats.map(s => s.number).join(", ")
    : "None";
};

export const calculateTotalPrice = (selectedSeats: Seat[], pricePerSeat: number): number => {
  return selectedSeats.length * pricePerSeat;
};
