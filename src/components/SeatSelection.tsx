
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bus, Seat } from "@/types";
import { generateSeats } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Group seats by row for better visual arrangement
  const seatsByRow = seats.reduce((acc, seat) => {
    // Extract row number from seat number (e.g., "1" from "1A")
    const rowNum = seat.number.slice(0, -1);
    if (!acc[rowNum]) acc[rowNum] = [];
    acc[rowNum].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

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
      
      <div className="flex justify-center mb-6">
        <div className="bg-muted p-3 rounded-lg text-sm flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-sm space-y-4">
          {/* Bus front visualization */}
          <div className="flex justify-center mb-2">
            <div className="w-24 h-8 bg-accent/50 rounded-t-full flex items-center justify-center text-xs font-medium">
              Driver
            </div>
          </div>
        
          {/* Seat grid by rows */}
          <div className="space-y-2">
            {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
              <div key={rowNum} className="grid grid-cols-4 gap-2">
                {rowSeats.map(seat => (
                  <div
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    className={`
                      flex items-center justify-center p-2 rounded-md cursor-pointer text-xs font-medium
                      relative transition-all duration-200 ease-in-out transform hover:scale-105
                      ${seat.isBooked
                        ? 'bg-gray-400 text-gray-100 cursor-not-allowed opacity-70'
                        : seat.isSelected
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-white border border-gray-300 hover:border-primary hover:shadow-sm'
                      }
                    `}
                  >
                    {seat.number}
                    {seat.isSelected && (
                      <Check className="absolute top-0 right-0 h-3 w-3 mt-0.5 mr-0.5" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2 text-sm">
          <span>Selected Seats:</span>
          <span className="font-medium">
            {selectedSeatIds.length > 0 
              ? seats
                  .filter(s => selectedSeatIds.includes(s.id))
                  .map(s => s.number)
                  .join(", ")
              : "None"}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total Price:</span>
          <span className="font-bold text-lg">{(selectedSeatIds.length * bus.price).toLocaleString()} XAF</span>
        </div>
        
        <Button onClick={handleBooking} className="w-full gap-1.5" disabled={selectedSeatIds.length === 0}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
