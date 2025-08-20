
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Bus } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  status?: 'pending' | 'confirmed' | 'rejected';
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "bookingDate" | "paymentConfirmed">) => Promise<string>;
  confirmBookingPayment: (bookingId: string) => Promise<void>;
  rejectBooking: (bookingId: string) => Promise<void>;
  getUserBookings: (userId: string) => Booking[];
  getAllBookings: () => Booking[];
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  // Load bookings from Supabase on mount
  useEffect(() => {
    refreshBookings();
  }, []);

  const refreshBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false });

      if (error) throw error;

      // Transform Supabase data to match our Booking interface
      const transformedBookings: Booking[] = (data || []).map(booking => ({
        id: booking.id,
        userId: booking.user_id,
        userName: booking.user_name || '',
        userEmail: booking.user_email || '',
        bus: {
          id: booking.bus_id,
          name: booking.bus_name || '',
          from: booking.from_location || '',
          to: booking.to_location || '',
          departureTime: booking.departure_time ? new Date(booking.departure_time).toLocaleTimeString() : '',
          arrivalTime: booking.arrival_time ? new Date(booking.arrival_time).toLocaleTimeString() : '',
          price: Math.floor(booking.total_price / (booking.seat_numbers?.length || 1)),
          availableSeats: 0,
          totalSeats: 0
        },
        seatIds: booking.seat_numbers || [],
        totalAmount: booking.total_price,
        paymentConfirmed: booking.payment_confirmed || booking.status === 'confirmed',
        bookingDate: booking.booking_date,
        departureDate: booking.departure_date,
        status: booking.status || 'pending'
      }));

      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    }
  };

  const addBooking = async (newBooking: Omit<Booking, "id" | "bookingDate" | "paymentConfirmed">): Promise<string> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: newBooking.userId,
          user_name: newBooking.userName,
          user_email: newBooking.userEmail,
          bus_id: newBooking.bus.id,
          bus_name: newBooking.bus.name,
          from_location: newBooking.bus.from,
          to_location: newBooking.bus.to,
          departure_time: newBooking.bus.departureTime,
          arrival_time: newBooking.bus.arrivalTime,
          seat_numbers: newBooking.seatIds,
          total_price: newBooking.totalAmount,
          departure_date: newBooking.departureDate,
          payment_confirmed: false,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      await refreshBookings();
      return data.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive",
      });
      throw error;
    }
  };

  const confirmBookingPayment = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          payment_confirmed: true,
          status: 'confirmed'
        })
        .eq('id', bookingId);

      if (error) throw error;

      await refreshBookings();
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast({
        title: "Error",
        description: "Failed to confirm booking",
        variant: "destructive",
      });
      throw error;
    }
  };

  const rejectBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          payment_confirmed: false,
          status: 'rejected'
        })
        .eq('id', bookingId);

      if (error) throw error;

      await refreshBookings();
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast({
        title: "Error",
        description: "Failed to reject booking",
        variant: "destructive",
      });
      throw error;
    }
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
      rejectBooking,
      getUserBookings,
      getAllBookings,
      refreshBookings
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
