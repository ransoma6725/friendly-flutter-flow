
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bus } from "@/types";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useBookings } from "@/contexts/BookingContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentDetailsProps {
  bus: Bus;
  selectedSeatIds: string[];
  onPayment: () => void;
  onBack: () => void;
}

const PaymentDetails = ({ bus, selectedSeatIds, onPayment, onBack }: PaymentDetailsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addBooking } = useBookings();
  const { toast } = useToast();

  const totalPrice = selectedSeatIds.length * bus.price;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your booking",
          variant: "destructive",
        });
        return;
      }

      // Create booking in database
      await addBooking({
        userId: user.id,
        userName: user.user_metadata?.name || user.email || 'Unknown User',
        userEmail: user.email || '',
        bus,
        seatIds: selectedSeatIds,
        totalAmount: totalPrice,
        departureDate: new Date().toISOString().split('T')[0], // Today's date for demo
      });

      // Mark seats as booked in localStorage (for local seat management)
      const currentBookedSeats = JSON.parse(localStorage.getItem(`bus_${bus.id}_booked_seats`) || '[]');
      const updatedBookedSeats = [...currentBookedSeats, ...selectedSeatIds];
      localStorage.setItem(`bus_${bus.id}_booked_seats`, JSON.stringify(updatedBookedSeats));

      toast({
        title: "Booking created successfully",
        description: "Your booking has been submitted and is awaiting payment confirmation",
      });

      onPayment();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Seats
        </Button>
        <h2 className="text-2xl font-bold">Payment Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route:</span>
              <span className="font-medium">{bus.from} → {bus.to}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bus:</span>
              <span className="font-medium">{bus.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Departure:</span>
              <span className="font-medium">{bus.departureTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Arrival:</span>
              <span className="font-medium">{bus.arrivalTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Seats:</span>
              <span className="font-medium">{selectedSeatIds.join(", ")}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>{totalPrice.toLocaleString()} XAF</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                disabled={isProcessing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  disabled={isProcessing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                disabled={isProcessing}
              />
            </div>
            
            <Separator className="my-6" />
            
            <Button 
              className="w-full" 
              onClick={handlePayment}
              disabled={isProcessing}
              size="lg"
            >
              {isProcessing ? "Processing..." : `Pay ${totalPrice.toLocaleString()} XAF`}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Your payment will be processed securely. You will receive a confirmation email once the payment is verified by our team.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetails;
