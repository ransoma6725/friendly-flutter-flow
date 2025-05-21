
export interface Bus {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  id: string;
  number: string;
  isBooked: boolean;
  isSelected?: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  busId: string;
  seatIds: string[];
  totalPrice: number;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Package {
  id: string;
  trackingId: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: number;
  status: "pending" | "in-transit" | "delivered";
  date: string;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: "active" | "suspended";
}

export interface Schedule {
  id: string;
  busId: string;
  busName: string;
  routeId: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  driver: string;
  status: "scheduled" | "departed" | "arrived" | "cancelled";
  price: number;
  availableSeats: number;
  totalSeats: number;
}
