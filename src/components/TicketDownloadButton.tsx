
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBookings, Booking } from "@/contexts/BookingContext";

interface TicketDownloadButtonProps {
  booking: Booking;
}

const TicketDownloadButton = ({ booking }: TicketDownloadButtonProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!booking.paymentConfirmed) {
      toast({
        title: "Unable to download ticket",
        description: "Your payment is still awaiting confirmation by the admin",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would generate an actual PDF or ticket
    toast({
      title: "Ticket downloaded",
      description: "Your ticket has been downloaded successfully",
    });
    
    // Mock downloading a ticket by creating a text file
    const ticketData = `
CamBus Ticket
--------------------------------
Booking Reference: ${booking.id}
Passenger: ${booking.userName}
Route: ${booking.bus.from} → ${booking.bus.to}
Departure: ${booking.bus.departureTime}
Arrival: ${booking.bus.arrivalTime}
Seats: ${booking.seatIds.join(", ")}
Total Amount: ${booking.totalAmount.toLocaleString()} XAF
--------------------------------
Valid ticket - Payment Confirmed
    `;
    
    const blob = new Blob([ticketData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CamBus-Ticket-${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant={booking.paymentConfirmed ? "default" : "outline"}
      size="sm"
      onClick={handleDownload}
      className="gap-1"
      disabled={!booking.paymentConfirmed}
    >
      <Download className="h-4 w-4" />
      {booking.paymentConfirmed ? "Download Ticket" : "Awaiting Confirmation"}
    </Button>
  );
};

export default TicketDownloadButton;
