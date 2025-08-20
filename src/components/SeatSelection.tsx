
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bus } from "@/types";
import { useSeatManagement } from "@/hooks/useSeatManagement";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SeatGrid from "@/components/seats/SeatGrid";
import SeatLegend from "@/components/seats/SeatLegend";
import BookingSummary from "@/components/seats/BookingSummary";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface SeatSelectionProps {
  bus: Bus;
  onBookSeats: (seatIds: string[]) => void;
  onBack: () => void;
}

const SeatSelection = ({ bus, onBookSeats, onBack }: SeatSelectionProps) => {
  const { toast } = useToast();
  const {
    seats,
    isLoading,
    toggleSeatSelection,
    getSelectedSeats,
    clearSelection
  } = useSeatManagement({
    busId: bus.id,
    totalSeats: bus.totalSeats
  });

  const selectedSeats = getSelectedSeats();
  const selectedSeatIds = selectedSeats.map(seat => seat.id);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && !seat.isBooked) {
      toggleSeatSelection(seatId);
    }
  };

  const handleBooking = () => {
    if (selectedSeatIds.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue",
        variant: "destructive",
      });
      return;
    }
    
    onBookSeats(selectedSeatIds);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Select Your Seats</h3>
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 bg-card border border-border rounded-lg p-3">
        <div className="flex justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary font-medium">
            {bus.name}
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground font-medium">
            {bus.from} → {bus.to}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground pt-1">
          Departure: {bus.departureTime} | Arrival: {bus.arrivalTime}
        </p>
      </div>
      
      <SeatLegend />
      <SeatGrid seats={seats} onSeatClick={handleSeatClick} />
      
      <BookingSummary 
        selectedSeats={selectedSeats}
        pricePerSeat={bus.price}
        onBook={handleBooking}
        onClearSelection={clearSelection}
        isBookingDisabled={selectedSeats.length === 0}
      />
    </div>
  );
};

export default SeatSelection;
