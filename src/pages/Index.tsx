
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import SignInForm from "@/components/SignInForm";
import { Bus } from "@/types";

const Index = () => {
  const { toast } = useToast();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [step, setStep] = useState<"auth" | "buses" | "seats" | "payment">("auth");

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - in a real app, this would connect to your auth service
    if (email && password) {
      setIsSignedIn(true);
      setStep("buses");
      toast({
        title: "Signed in successfully",
        description: "Welcome to the Bus Ticketing System!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setStep("seats");
    toast({
      title: "Bus selected",
      description: `You selected ${bus.name} from ${bus.from} to ${bus.to}`,
    });
  };

  const handleBookSeats = (seatIds: string[]) => {
    setStep("payment");
    toast({
      title: "Seats selected",
      description: `You selected ${seatIds.length} seats`,
    });
  };

  const handlePayment = () => {
    toast({
      title: "Payment successful",
      description: "Your booking has been confirmed!",
    });
    // Reset the flow
    setSelectedBus(null);
    setStep("buses");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bus Ticketing System
          </CardTitle>
          <CardDescription className="text-center">
            Book your bus tickets easily and quickly
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === "auth" && !isSignedIn && (
            <SignInForm onSignIn={handleSignIn} />
          )}
          
          {step === "buses" && (
            <BusList buses={buses} onSelectBus={handleSelectBus} />
          )}
          
          {step === "seats" && selectedBus && (
            <SeatSelection 
              bus={selectedBus} 
              onBookSeats={handleBookSeats} 
              onBack={() => setStep("buses")}
            />
          )}
          
          {step === "payment" && selectedBus && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment</h3>
              <p>Bus: {selectedBus.name}</p>
              <p>From: {selectedBus.from} to {selectedBus.to}</p>
              <p>Price: ${selectedBus.price}</p>
              
              <div className="pt-4 border-t">
                <Button onClick={handlePayment} className="w-full">
                  Pay Now
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        {isSignedIn && step !== "auth" && (
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSignedIn(false);
                setSelectedBus(null);
                setStep("auth");
              }}
              className="w-full"
            >
              Sign Out
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Index;
