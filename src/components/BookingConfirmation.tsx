
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket } from "lucide-react";
import { Bus } from "@/types";

interface BookingConfirmationProps {
  bus: Bus;
  selectedSeatIds: string[];
  onNewBooking: () => void;
}

const BookingConfirmation = ({ bus, selectedSeatIds, onNewBooking }: BookingConfirmationProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Ticket className="h-12 w-12 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Ticket Confirmed!</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-sm">
        Your booking has been confirmed. You will receive your ticket details via email shortly.
      </p>
      
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm mb-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID:</span>
            <span className="font-medium">CB{Math.floor(Math.random() * 10000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bus:</span>
            <span className="font-medium">{bus.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route:</span>
            <span className="font-medium">{bus.from} → {bus.to}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Departure:</span>
            <span className="font-medium">{bus.departureTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seats:</span>
            <span className="font-medium">{selectedSeatIds.length}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 font-bold">
            <span>Total Paid:</span>
            <span>{(selectedSeatIds.length * bus.price).toLocaleString()} XAF</span>
          </div>
        </div>
      </div>
      
      <Button onClick={onNewBooking} className="gap-1">
        Book Another Trip <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BookingConfirmation;
