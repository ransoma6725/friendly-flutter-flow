
import { Step } from "@/utils/stepHelpers";
import { Bus } from "@/types";
import { buses } from "@/services/mockData";
import BusList from "@/components/BusList";
import SeatSelection from "@/components/SeatSelection";
import PaymentDetails from "@/components/PaymentDetails";
import BookingConfirmation from "@/components/BookingConfirmation";

interface BookingStepManagerProps {
  currentStep: Step;
  selectedBus: Bus | null;
  selectedSeatIds: string[];
  onStepChange: (step: Step) => void;
  onSelectBus: (bus: Bus) => void;
  onBookSeats: (seatIds: string[]) => void;
  onPayment: () => void;
  onNewBooking: () => void;
  onGoHome: () => void;
}

const BookingStepManager = ({
  currentStep,
  selectedBus,
  selectedSeatIds,
  onStepChange,
  onSelectBus,
  onBookSeats,
  onPayment,
  onNewBooking,
  onGoHome
}: BookingStepManagerProps) => {
  const renderBookingStep = () => {
    switch (currentStep) {
      case "buses":
        return <BusList buses={buses} onSelectBus={onSelectBus} />;
      
      case "seats":
        return selectedBus ? (
          <SeatSelection 
            bus={selectedBus} 
            onBookSeats={onBookSeats} 
            onBack={() => onStepChange("buses")}
          />
        ) : null;
      
      case "payment":
        return selectedBus ? (
          <PaymentDetails 
            bus={selectedBus}
            selectedSeatIds={selectedSeatIds}
            onPayment={onPayment}
            onBack={() => onStepChange("seats")}
          />
        ) : null;
      
      case "confirmation":
        return selectedBus ? (
          <BookingConfirmation
            bus={selectedBus}
            selectedSeatIds={selectedSeatIds}
            onNewBooking={onNewBooking}
            onGoHome={onGoHome}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return <>{renderBookingStep()}</>;
};

export default BookingStepManager;
