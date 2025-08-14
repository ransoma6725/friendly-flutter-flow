
import { Button } from "@/components/ui/button";
import { useBookings } from "@/contexts/BookingContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface BookingManagementProps {
  userId: string;
}

const BookingManagement = ({ userId }: BookingManagementProps) => {
  const { getUserBookings } = useBookings();
  const { toast } = useToast();
  const userBookings = getUserBookings(userId);

  const handleCancelBooking = (bookingId: string, busId: string, seatIds: string[]) => {
    // Remove seats from booked seats in localStorage
    const currentBookedSeats = JSON.parse(localStorage.getItem(`bus_${busId}_booked_seats`) || '[]');
    const updatedBookedSeats = currentBookedSeats.filter((seatId: string) => !seatIds.includes(seatId));
    localStorage.setItem(`bus_${busId}_booked_seats`, JSON.stringify(updatedBookedSeats));
    
    toast({
      title: "Booking cancelled",
      description: "Your seats have been released and are now available for booking.",
    });
  };

  if (userBookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No bookings found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {userBookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Booking #{booking.id}</span>
              <Badge variant={booking.paymentConfirmed ? "default" : "secondary"}>
                {booking.paymentConfirmed ? "Confirmed" : "Pending"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="font-medium">{booking.bus.from} → {booking.bus.to}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bus</p>
                <p className="font-medium">{booking.bus.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seats</p>
                <p className="font-medium">{booking.seatIds.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">{booking.totalAmount.toLocaleString()} XAF</p>
              </div>
            </div>
            
            {!booking.paymentConfirmed && (
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id, booking.bus.id, booking.seatIds)}
                >
                  Cancel Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingManagement;
