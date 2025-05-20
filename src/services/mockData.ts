
import { Bus, Seat } from "@/types";

// Mock bus data
export const buses: Bus[] = [
  {
    id: "bus-1",
    name: "Express Line 1",
    from: "New York",
    to: "Boston",
    departureTime: "08:00 AM",
    arrivalTime: "12:00 PM",
    price: 45,
    availableSeats: 30,
    totalSeats: 40
  },
  {
    id: "bus-2",
    name: "City Shuttle",
    from: "Los Angeles",
    to: "San Francisco",
    departureTime: "09:30 AM",
    arrivalTime: "03:45 PM",
    price: 60,
    availableSeats: 25,
    totalSeats: 40
  },
  {
    id: "bus-3",
    name: "Night Rider",
    from: "Chicago",
    to: "Detroit",
    departureTime: "10:00 PM",
    arrivalTime: "03:00 AM",
    price: 40,
    availableSeats: 35,
    totalSeats: 40
  }
];

// Generate seat data for a bus
export const generateSeats = (busId: string, totalSeats: number): Seat[] => {
  const seats: Seat[] = [];
  
  // Create 10 rows with 4 seats each (A, B, C, D)
  for (let i = 1; i <= totalSeats/4; i++) {
    ['A', 'B', 'C', 'D'].forEach((letter) => {
      const seatNumber = `${i}${letter}`;
      seats.push({
        id: `${busId}-seat-${seatNumber}`,
        number: seatNumber,
        isBooked: Math.random() < 0.3, // 30% chance of being booked
      });
    });
  }
  
  return seats;
};
