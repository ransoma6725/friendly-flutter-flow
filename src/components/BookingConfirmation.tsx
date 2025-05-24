
import { Button } from "@/components/ui/button";
import { Bus } from "@/types";
import { useNavigate } from "react-router-dom"; 
import { Check, Calendar, Home, User, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BookingConfirmationProps {
  bus: Bus;
  selectedSeatIds: string[];
  onNewBooking: () => void;
  onGoHome: () => void;
  bookingId?: string;
}

const BookingConfirmation = ({ bus, selectedSeatIds, onNewBooking, onGoHome, bookingId = "" }: BookingConfirmationProps) => {
  const navigate = useNavigate();
  
  // Generate a random booking reference if not provided
  const bookingReference = bookingId || `BK-${Math.floor(10000 + Math.random() * 90000)}`;
  // Use the current date for the booking date
  const bookingDate = new Date().toISOString().split('T')[0];
  
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate("/");
    }
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold">Booking Recorded!</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Your booking has been recorded. Your ticket will be available for download once payment is confirmed by our team.
        </p>
      </div>
      
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Payment Confirmation Pending</AlertTitle>
        <AlertDescription className="text-amber-700">
          Your payment is being verified. Once confirmed, you will be able to download your ticket from your booking history.
        </AlertDescription>
      </Alert>
      
      <div className="bg-muted/50 border rounded-lg p-6 max-w-md mx-auto text-left">
        <div className="mb-4 pb-4 border-b">
          <div className="text-xs text-muted-foreground">Booking Reference</div>
          <div className="text-xl font-bold text-primary">{bookingReference}</div>
          <div className="text-xs text-muted-foreground mt-2">Booking Date: {bookingDate}</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="text-sm">
              <div className="text-muted-foreground">Route</div>
              <div className="font-medium">{bus.from} → {bus.to}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Bus</div>
              <div className="font-medium">{bus.name}</div>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="text-sm">
              <div className="text-muted-foreground">Departure</div>
              <div className="font-medium">{bus.departureTime}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Arrival</div>
              <div className="font-medium">{bus.arrivalTime}</div>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="text-sm">
              <div className="text-muted-foreground">Seat(s)</div>
              <div className="font-medium">{selectedSeatIds.join(", ")}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Total Price</div>
              <div className="font-bold">{(selectedSeatIds.length * bus.price).toLocaleString()} XAF</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button 
          variant="default" 
          className="flex items-center gap-2"
          onClick={() => navigate("/user/bookings")}
        >
          <User className="h-4 w-4" />
          View My Bookings
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onNewBooking}
        >
          <Calendar className="h-4 w-4" />
          Book Another Trip
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={handleGoHome}
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
