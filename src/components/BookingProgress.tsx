
import { Progress } from "@/components/ui/progress";
import { AppState } from "@/hooks/useBookingFlow";

interface BookingProgressProps {
  currentStep: AppState;
  progressPercentage: number;
}

const BookingProgress = ({ currentStep, progressPercentage }: BookingProgressProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <div className="flex items-center gap-1">
          <span className={currentStep === "buses" ? "font-medium text-primary" : "text-muted-foreground"}>
            Select Bus
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={currentStep === "seats" ? "font-medium text-primary" : "text-muted-foreground"}>
            Choose Seats
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={currentStep === "payment" ? "font-medium text-primary" : "text-muted-foreground"}>
            Payment
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={currentStep === "confirmation" ? "font-medium text-primary" : "text-muted-foreground"}>
            Confirmation
          </span>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default BookingProgress;
