
import { Progress } from "@/components/ui/progress";
import { AppState } from "@/utils/stepHelpers";
import { cn } from "@/lib/utils";

interface ClickableBookingProgressProps {
  currentStep: AppState;
  progressPercentage: number;
  onStepClick: (step: AppState) => void;
  selectedBus: any;
  selectedSeatIds: string[];
}

const ClickableBookingProgress = ({ 
  currentStep, 
  progressPercentage, 
  onStepClick, 
  selectedBus,
  selectedSeatIds 
}: ClickableBookingProgressProps) => {
  
  const steps = [
    { key: "buses" as AppState, label: "Select Bus", enabled: true },
    { key: "seats" as AppState, label: "Choose Seats", enabled: !!selectedBus },
    { key: "payment" as AppState, label: "Payment", enabled: !!selectedBus && selectedSeatIds.length > 0 },
    { key: "confirmation" as AppState, label: "Confirmation", enabled: false }
  ];

  const getStepIndex = (step: AppState) => {
    return steps.findIndex(s => s.key === step);
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted = index < currentIndex;
          const isClickable = step.enabled && (isCompleted || index <= currentIndex + 1);
          
          return (
            <div 
              key={step.key}
              className={cn(
                "flex items-center gap-1 transition-colors cursor-pointer",
                isActive && "font-medium text-primary",
                !isActive && !isCompleted && "text-muted-foreground",
                isCompleted && "text-green-600",
                !isClickable && "cursor-not-allowed opacity-50"
              )}
              onClick={() => isClickable && onStepClick(step.key)}
            >
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mr-1",
                isActive && "border-primary bg-primary text-primary-foreground",
                isCompleted && "border-green-600 bg-green-600 text-white",
                !isActive && !isCompleted && "border-muted-foreground"
              )}>
                {index + 1}
              </div>
              <span className={cn(
                isClickable && "hover:text-primary"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default ClickableBookingProgress;
