
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bus, Seat } from "@/types";
import { generateSeats } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

interface SeatSelectionProps {
  bus: Bus;
  onBookSeats: (seatIds: string[]) => void;
  onBack: () => void;
}

const SeatSelection = ({ bus, onBookSeats, onBack }: SeatSelectionProps) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch seats from API
    const busSeats = generateSeats(bus.id, bus.totalSeats);
    setSeats(busSeats);
  }, [bus]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    setSeats(seats.map(s => 
      s.id === seat.id 
        ? { ...s, isSelected: !s.isSelected } 
        : s
    ));

    setSelectedSeatIds(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      } else {
        return [...prev, seat.id];
      }
    });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Select Seats</h3>
        <Button variant="outline" size="sm" onClick={onBack}>
          Back
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Bus: {bus.name}</p>
        <p className="text-sm text-gray-500 mb-2">
          From {bus.from} to {bus.to} at {bus.departureTime}
        </p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 p-2 rounded-md text-xs flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {seats.map(seat => (
          <div
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={`
              flex items-center justify-center p-2 rounded-md cursor-pointer text-xs font-medium
              ${seat.isBooked
                ? 'bg-gray-400 text-gray-100 cursor-not-allowed'
                : seat.isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-white border border-gray-300 hover:border-primary'
              }
            `}
          >
            {seat.number}
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span>Selected Seats:</span>
          <span>{selectedSeatIds.length}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total Price:</span>
          <span>${selectedSeatIds.length * bus.price}</span>
        </div>
        
        <Button onClick={handleBooking} className="w-full">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
