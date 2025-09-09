import { supabase } from "@/integrations/supabase/client";
import { Bus } from "@/types";

export interface BusData {
  id: string;
  name: string;
  from_location: string;
  to_location: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
  total_seats: number;
  status?: string;
  created_at: string;
}

export class BusService {
  static async getAllBuses(): Promise<Bus[]> {
    const { data, error } = await supabase
      .from('buses')
      .select('*')
      .order('departure_time');

    if (error) {
      console.error('Error fetching buses:', error);
      throw new Error('Failed to fetch buses');
    }

    return (data || []).map(bus => ({
      id: bus.id,
      name: bus.name,
      from: bus.from_location,
      to: bus.to_location,
      departureTime: new Date(bus.departure_time).toLocaleTimeString(),
      arrivalTime: new Date(bus.arrival_time).toLocaleTimeString(),
      price: bus.price,
      availableSeats: bus.available_seats,
      totalSeats: bus.total_seats
    }));
  }

  static async getBusById(busId: string): Promise<Bus | null> {
    const { data, error } = await supabase
      .from('buses')
      .select('*')
      .eq('id', busId)
      .single();

    if (error) {
      console.error('Error fetching bus:', error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      from: data.from_location,
      to: data.to_location,
      departureTime: new Date(data.departure_time).toLocaleTimeString(),
      arrivalTime: new Date(data.arrival_time).toLocaleTimeString(),
      price: data.price,
      availableSeats: data.available_seats,
      totalSeats: data.total_seats
    };
  }

  static async updateAvailableSeats(busId: string, seatsBooked: number): Promise<void> {
    // First get current available seats
    const { data: bus, error: fetchError } = await supabase
      .from('buses')
      .select('available_seats')
      .eq('id', busId)
      .single();

    if (fetchError || !bus) {
      console.error('Error fetching bus for seat update:', fetchError);
      throw new Error('Failed to get bus information');
    }

    const newAvailableSeats = Math.max(0, bus.available_seats - seatsBooked);

    const { error } = await supabase
      .from('buses')
      .update({ available_seats: newAvailableSeats })
      .eq('id', busId);

    if (error) {
      console.error('Error updating available seats:', error);
      throw new Error('Failed to update available seats');
    }
  }
}