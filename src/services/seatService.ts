
import { supabase } from "@/integrations/supabase/client";
import { Seat } from "@/types";

export interface SeatData {
  id: string;
  bus_id: string;
  number: string;
  is_booked: boolean;
  created_at: string;
}

export class SeatService {
  static async getSeatsForBus(busId: string): Promise<Seat[]> {
    const { data, error } = await supabase
      .from('seats')
      .select('*')
      .eq('bus_id', busId)
      .order('number');

    if (error) {
      console.error('Error fetching seats:', error);
      throw new Error('Failed to fetch seats');
    }

    return (data || []).map(seat => ({
      id: seat.id,
      number: seat.number,
      isBooked: seat.is_booked,
      isSelected: false
    }));
  }

  static async bookSeats(seatIds: string[]): Promise<void> {
    const { error } = await supabase
      .from('seats')
      .update({ is_booked: true })
      .in('id', seatIds);

    if (error) {
      console.error('Error booking seats:', error);
      throw new Error('Failed to book seats');
    }
  }

  static async cancelSeatBooking(seatIds: string[]): Promise<void> {
    const { error } = await supabase
      .from('seats')
      .update({ is_booked: false })
      .in('id', seatIds);

    if (error) {
      console.error('Error cancelling seat booking:', error);
      throw new Error('Failed to cancel seat booking');
    }
  }

  static async createSeatsForBus(busId: string, totalSeats: number): Promise<void> {
    const seats = [];
    const rows = Math.ceil(totalSeats / 4);
    const seatLetters = ['A', 'B', 'C', 'D'];

    for (let row = 1; row <= rows; row++) {
      const seatsInRow = Math.min(4, totalSeats - (row - 1) * 4);
      
      for (let seatIndex = 0; seatIndex < seatsInRow; seatIndex++) {
        const seatNumber = `${row}${seatLetters[seatIndex]}`;
        seats.push({
          bus_id: busId,
          number: seatNumber,
          is_booked: false
        });
      }
    }

    const { error } = await supabase
      .from('seats')
      .insert(seats);

    if (error) {
      console.error('Error creating seats:', error);
      throw new Error('Failed to create seats');
    }
  }
}
