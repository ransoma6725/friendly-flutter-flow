
import { Button } from "@/components/ui/button";
import { ArrowLeft, CopyIcon, CheckIcon } from "lucide-react";
import { Bus } from "@/types";
import { useState } from "react";
import { toast } from "@/components/ui/toast-utils";

interface PaymentDetailsProps {
  bus: Bus;
  selectedSeatIds: string[];
  onPayment: () => void;
  onBack: () => void;
}

const PaymentDetails = ({ bus, selectedSeatIds, onPayment, onBack }: PaymentDetailsProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"mtn" | "orange">("mtn");
  const [copied, setCopied] = useState<string | null>(null);
  
  const mtnNumber = "673371017";
  const orangeNumber = "659942442";
  
  const handleCopyNumber = (number: string, type: string) => {
    navigator.clipboard.writeText(number);
    setCopied(type);
    toast({
      title: "Number copied!",
      description: `${type} number copied to clipboard.`,
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const getPaymentInstructions = () => {
    if (paymentMethod === "mtn") {
      return [
        "Dial *126# on your phone",
        "Select \"Send Money\"",
        `Enter the number: ${mtnNumber}`,
        `Enter amount: ${(selectedSeatIds.length * bus.price).toLocaleString()} XAF`,
        "Enter your PIN to confirm",
        "Click \"Complete Payment\" below once done"
      ];
    } else {
      return [
        "Dial #150# on your phone",
        "Select \"Send Money\"",
        `Enter the number: ${orangeNumber}`,
        `Enter amount: ${(selectedSeatIds.length * bus.price).toLocaleString()} XAF`,
        "Enter your PIN to confirm",
        "Click \"Complete Payment\" below once done"
      ];
    }
  };

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
            <label className={`flex items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "mtn" ? "border-primary bg-primary/5" : ""}`}>
              <input 
                type="radio" 
                name="paymentMethod" 
                checked={paymentMethod === "mtn"} 
                onChange={() => setPaymentMethod("mtn")} 
                className="mr-2" 
              />
              <span>MTN Mobile Money</span>
            </label>
          </div>
          <div className="flex-1">
            <label className={`flex items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "orange" ? "border-primary bg-primary/5" : ""}`}>
              <input 
                type="radio" 
                name="paymentMethod" 
                checked={paymentMethod === "orange"} 
                onChange={() => setPaymentMethod("orange")} 
                className="mr-2" 
              />
              <span>Orange Money</span>
            </label>
          </div>
        </div>
        
        <div className="p-4 border rounded-md bg-muted/30">
          <h4 className="font-medium mb-2">
            {paymentMethod === "mtn" ? "MTN MoMo Payment Instructions" : "Orange Money Payment Instructions"}
          </h4>
          
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {getPaymentInstructions().map((instruction, index) => (
              <li key={index}>
                {index === 2 ? (
                  <>
                    Enter the number: 
                    <span className="ml-1 font-medium">
                      {paymentMethod === "mtn" ? mtnNumber : orangeNumber}
                      <button 
                        onClick={() => handleCopyNumber(
                          paymentMethod === "mtn" ? mtnNumber : orangeNumber,
                          paymentMethod === "mtn" ? "MTN" : "Orange"
                        )}
                        className="ml-2 inline-flex items-center text-primary hover:text-primary/80"
                      >
                        {copied === (paymentMethod === "mtn" ? "MTN" : "Orange") ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </button>
                    </span>
                  </>
                ) : (
                  instruction
                )}
              </li>
            ))}
          </ol>
        </div>
        
        <Button 
          onClick={onPayment} 
          className="w-full"
        >
          Complete Payment
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
