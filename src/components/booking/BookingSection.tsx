
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import PaymentDetails from "@/components/PaymentDetails";
import BookingConfirmation from "@/components/BookingConfirmation";
import BookingSteps from "@/components/booking/BookingSteps";
import { Button } from "@/components/ui/button";
import { Bus } from "@/types";
import { AppState } from "@/utils/stepHelpers";

interface BookingSectionProps {
  step: AppState;
  title: string;
  description: string;
  progressPercentage: number;
  selectedBus: Bus | null;
  selectedSeatIds: string[];
  isSignedIn: boolean;
  onSelectBus: (bus: Bus) => void;
  onBookSeats: (seatIds: string[]) => void;
  onPayment: () => void;
  onNewBooking: () => void;
  onGoHome: () => void;
  onSignOut: () => void;
  setStep: (step: AppState) => void;
}

const BookingSection = ({
  step,
  title,
  description,
  progressPercentage,
  selectedBus,
  selectedSeatIds,
  isSignedIn,
  onSelectBus,
  onBookSeats,
  onPayment,
  onNewBooking,
  onGoHome,
  onSignOut,
  setStep,
}: BookingSectionProps) => {
  return (
    <BookingSteps
      step={step}
      title={title}
      description={description}
      progressPercentage={progressPercentage}
    >
      {step === "buses" && (
        <BusList buses={buses} onSelectBus={onSelectBus} />
      )}
      
      {step === "seats" && selectedBus && (
        <SeatSelection 
          bus={selectedBus} 
          onBookSeats={onBookSeats} 
          onBack={() => setStep("buses")}
        />
      )}
      
      {step === "payment" && selectedBus && (
        <PaymentDetails 
          bus={selectedBus}
          selectedSeatIds={selectedSeatIds}
          onPayment={onPayment}
          onBack={() => setStep("seats")}
        />
      )}
      
      {step === "confirmation" && selectedBus && (
        <BookingConfirmation
          bus={selectedBus}
          selectedSeatIds={selectedSeatIds}
          onNewBooking={onNewBooking}
          onGoHome={onGoHome}
        />
      )}
      
      {isSignedIn && !["confirmation"].includes(step) && (
        <div className="mt-4 md:mt-6 flex justify-end">
          <Button 
            variant="outline"
            onClick={onSignOut}
            size="sm"
          >
            Sign Out
          </Button>
        </div>
      )}
    </BookingSteps>
  );
};

export default BookingSection;
