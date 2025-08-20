
import { Button } from "@/components/ui/button";
import { Seat } from "@/types";
import { formatSelectedSeats, calculateTotalPrice } from "@/utils/seatUtils";

interface BookingSummaryProps {
  selectedSeats: Seat[];
  pricePerSeat: number;
  onBook: () => void;
  onClearSelection: () => void;
  isBookingDisabled: boolean;
}

const BookingSummary = ({ 
  selectedSeats, 
  pricePerSeat, 
  onBook, 
  onClearSelection,
  isBookingDisabled 
}: BookingSummaryProps) => {
  const totalPrice = calculateTotalPrice(selectedSeats, pricePerSeat);
  const formattedSeats = formatSelectedSeats(selectedSeats);

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between mb-2 text-sm">
        <span>Selected Seats:</span>
        <span className="font-medium">{formattedSeats}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Total Price:</span>
        <span className="font-bold text-lg">{totalPrice.toLocaleString()} XAF</span>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onBook} 
          className="flex-1 gap-1.5" 
          disabled={isBookingDisabled}
        >
          Continue to Payment
        </Button>
        {selectedSeats.length > 0 && (
          <Button variant="outline" onClick={onClearSelection}>
            Clear Selection
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
