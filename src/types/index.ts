
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
