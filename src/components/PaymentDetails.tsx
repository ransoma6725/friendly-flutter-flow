
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Bus } from "@/types";

interface PaymentDetailsProps {
  bus: Bus;
  selectedSeatIds: string[];
  onPayment: () => void;
  onBack: () => void;
}

const PaymentDetails = ({ bus, selectedSeatIds, onPayment, onBack }: PaymentDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bus:</span>
            <span className="font-medium">{bus.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route:</span>
            <span className="font-medium">{bus.from} → {bus.to}</span>
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
            <span className="text-muted-foreground">Seats:</span>
            <span className="font-medium">{selectedSeatIds.length}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span>Price per seat:</span>
            <span className="font-medium">{bus.price.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount:</span>
            <span>{(selectedSeatIds.length * bus.price).toLocaleString()} XAF</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="flex items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors">
              <input type="radio" name="paymentMethod" defaultChecked className="mr-2" />
              <span>MTN Mobile Money</span>
            </label>
          </div>
          <div className="flex-1">
            <label className="flex items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors">
              <input type="radio" name="paymentMethod" className="mr-2" />
              <span>Orange Money</span>
            </label>
          </div>
        </div>
        
        <Button 
          onClick={onPayment} 
          className="w-full"
        >
          Pay {(selectedSeatIds.length * bus.price).toLocaleString()} XAF
        </Button>
        
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
