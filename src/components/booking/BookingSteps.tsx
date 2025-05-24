
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BookingProgress from "@/components/BookingProgress";
import { AppState } from "@/utils/stepHelpers";

interface BookingStepsProps {
  step: AppState;
  title: string;
  description: string;
  progressPercentage: number;
  children: ReactNode;
  showProgress?: boolean;
}

const BookingSteps = ({ 
  step, 
  title, 
  description, 
  progressPercentage, 
  children,
  showProgress = true
}: BookingStepsProps) => {
  return (
    <>
      {showProgress && !["auth", "signup", "forgot-password"].includes(step) && (
        <BookingProgress currentStep={step} progressPercentage={progressPercentage} />
      )}
      
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardContent className={`p-4 md:p-6 ${step === "confirmation" ? "text-center" : ""}`}>
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm md:text-base">{description}</p>
          </div>
          
          {children}
        </CardContent>
      </Card>
    </>
  );
};

export default BookingSteps;
