
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Bus } from "@/types";

// Define the structure of a booking
export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  bus: Bus;
  seatIds: string[];
  totalAmount: number;
  paymentConfirmed: boolean;
  bookingDate: string;
  departureDate: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "bookingDate" | "paymentConfirmed">) => string;
  confirmBookingPayment: (bookingId: string) => void;
  getUserBookings: (userId: string) => Booking[];
  getAllBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem("cambus_bookings");
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        setBookings(parsed);
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
      }
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cambus_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking: Omit<Booking, "id" | "bookingDate" | "paymentConfirmed">) => {
    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const booking: Booking = {
      ...newBooking,
      id: bookingId,
      bookingDate: new Date().toISOString(),
      paymentConfirmed: false
    };
    
    setBookings(prev => [...prev, booking]);
    return bookingId;
  };

  const confirmBookingPayment = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, paymentConfirmed: true } 
          : booking
      )
    );
  };

  const getUserBookings = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getAllBookings = () => {
    return bookings;
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      confirmBookingPayment, 
      getUserBookings,
      getAllBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}
