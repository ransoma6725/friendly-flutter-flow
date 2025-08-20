
import { Check } from "lucide-react";
import { Seat } from "@/types";
import { groupSeatsByRow, getSeatDisplayClasses } from "@/utils/seatUtils";

interface SeatGridProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

const SeatGrid = ({ seats, onSeatClick }: SeatGridProps) => {
  const seatsByRow = groupSeatsByRow(seats);

  return (
    <div className="flex justify-center mb-6">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-24 h-8 bg-accent/50 rounded-t-full flex items-center justify-center text-xs font-medium">
            Driver
          </div>
        </div>
      
        <div className="space-y-2">
          {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
            <div key={rowNum} className="grid grid-cols-4 gap-2">
              {rowSeats.map(seat => (
                <div
                  key={seat.id}
                  onClick={() => onSeatClick(seat.id)}
                  className={getSeatDisplayClasses(seat)}
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
  );
};

export default SeatGrid;
