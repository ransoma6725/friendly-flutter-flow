
import { Bus, Seat } from "@/types";

// Mock bus data for Cameroon
export const buses: Bus[] = [
  {
    id: "bus-1",
    name: "Garanti Express",
    from: "Douala",
    to: "Yaoundé",
    departureTime: "08:00 AM",
    arrivalTime: "12:30 PM",
    price: 5000,
    availableSeats: 30,
    totalSeats: 40
  },
  {
    id: "bus-2",
    name: "Central Voyage",
    from: "Yaoundé",
    to: "Bamenda",
    departureTime: "09:30 AM",
    arrivalTime: "04:00 PM",
    price: 7500,
    availableSeats: 25,
    totalSeats: 40
  },
  {
    id: "bus-3",
    name: "Touristique Express",
    from: "Douala",
    to: "Kribi",
    departureTime: "10:00 AM",
    arrivalTime: "01:30 PM",
    price: 4000,
    availableSeats: 35,
    totalSeats: 40
  },
  {
    id: "bus-4",
    name: "Buca Voyages",
    from: "Buea",
    to: "Limbe",
    departureTime: "11:00 AM",
    arrivalTime: "12:15 PM",
    price: 2000,
    availableSeats: 18,
    totalSeats: 40
  },
  {
    id: "bus-5",
    name: "Nord Express",
    from: "Yaoundé",
    to: "Garoua",
    departureTime: "07:30 PM",
    arrivalTime: "06:00 AM",
    price: 12000,
    availableSeats: 22,
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
