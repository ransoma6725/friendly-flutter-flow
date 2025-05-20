
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import SignInForm from "@/components/SignInForm";
import { Bus } from "@/types";
import { ArrowLeft, ArrowRight, Bus as BusIcon, Ticket } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const { toast } = useToast();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [step, setStep] = useState<"auth" | "buses" | "seats" | "payment" | "confirmation">("auth");
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Calculate progress percentage based on step
  const getProgressPercentage = () => {
    switch(step) {
      case "auth": return 25;
      case "buses": return 50;
      case "seats": return 75;
      case "payment": 
      case "confirmation": return 100;
      default: return 0;
    }
  };

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - in a real app, this would connect to your auth service
    if (email && password) {
      setIsSignedIn(true);
      setStep("buses");
      toast({
        title: "Signed in successfully",
        description: "Welcome to CamBus Ticketing System!",
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
    setSelectedSeatIds(seatIds);
    setStep("payment");
    toast({
      title: "Seats selected",
      description: `You selected ${seatIds.length} seats`,
    });
  };

  const handlePayment = () => {
    setStep("confirmation");
    toast({
      title: "Payment successful",
      description: "Your booking has been confirmed!",
    });
  };

  const handleNewBooking = () => {
    // Reset the flow
    setSelectedBus(null);
    setSelectedSeatIds([]);
    setStep("buses");
  };

  return (
    <div className="min-h-screen p-4 bg-hero-pattern">
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BusIcon className="h-7 w-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            CamBus <span className="text-primary">Ticketing</span>
          </h1>
        </div>

        {isSignedIn && step !== "auth" && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-1">
                <span className={step === "buses" ? "font-medium text-primary" : "text-muted-foreground"}>
                  Select Bus
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={step === "seats" ? "font-medium text-primary" : "text-muted-foreground"}>
                  Choose Seats
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={step === "payment" ? "font-medium text-primary" : "text-muted-foreground"}>
                  Payment
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={step === "confirmation" ? "font-medium text-primary" : "text-muted-foreground"}>
                  Confirmation
                </span>
              </div>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        )}
        
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className={step === "confirmation" ? "text-center" : ""}>
            <CardTitle className="text-2xl font-bold">
              {step === "auth" && "CamBus Ticketing System"}
              {step === "buses" && "Select Your Route"}
              {step === "seats" && "Choose Your Seats"}
              {step === "payment" && "Payment Details"}
              {step === "confirmation" && "Booking Confirmed"}
            </CardTitle>
            <CardDescription>
              {step === "auth" && "Sign in to book your bus tickets easily"}
              {step === "buses" && "Browse available buses and routes"}
              {step === "seats" && "Select your preferred seats"}
              {step === "payment" && "Complete your payment to confirm booking"}
              {step === "confirmation" && "Your ticket has been booked successfully"}
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
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bus:</span>
                      <span className="font-medium">{selectedBus.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium">{selectedBus.from} → {selectedBus.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure:</span>
                      <span className="font-medium">{selectedBus.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arrival:</span>
                      <span className="font-medium">{selectedBus.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seats:</span>
                      <span className="font-medium">{selectedSeatIds.length}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span>Price per seat:</span>
                      <span className="font-medium">{selectedBus.price.toLocaleString()} XAF</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span>{(selectedSeatIds.length * selectedBus.price).toLocaleString()} XAF</span>
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
                    onClick={handlePayment} 
                    className="w-full"
                  >
                    Pay {(selectedSeatIds.length * selectedBus.price).toLocaleString()} XAF
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setStep("seats")}
                    className="w-full gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Seat Selection
                  </Button>
                </div>
              </div>
            )}
            
            {step === "confirmation" && selectedBus && (
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
                      <span className="font-medium">{selectedBus.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium">{selectedBus.from} → {selectedBus.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure:</span>
                      <span className="font-medium">{selectedBus.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seats:</span>
                      <span className="font-medium">{selectedSeatIds.length}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2 font-bold">
                      <span>Total Paid:</span>
                      <span>{(selectedSeatIds.length * selectedBus.price).toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleNewBooking} className="gap-1">
                  Book Another Trip <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
          
          {isSignedIn && step !== "auth" && step !== "confirmation" && (
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsSignedIn(false);
                  setSelectedBus(null);
                  setSelectedSeatIds([]);
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
    </div>
  );
};

export default Index;
