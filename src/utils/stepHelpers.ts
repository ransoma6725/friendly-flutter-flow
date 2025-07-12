
export type Step = "auth" | "signup" | "admin-signup" | "forgot-password" | "buses" | "seats" | "payment" | "confirmation";

// Add AppState type alias for backward compatibility
export type AppState = Step;

export const getStepInfo = (step: Step) => {
  switch (step) {
    case "auth":
      return {
        title: "Welcome to CamBus",
        description: "Your trusted partner for bus transportation across Cameroon"
      };
    case "signup":
      return {
        title: "Create Your Account",
        description: "Join CamBus to start booking your bus tickets"
      };
    case "admin-signup":
      return {
        title: "Create Admin Account",
        description: "Set up your administrator account for CamBus"
      };
    case "forgot-password":
      return {
        title: "Reset Your Password",
        description: "Enter your email to receive password reset instructions"
      };
    case "buses":
      return {
        title: "Choose Your Bus",
        description: "Select from our available buses for your journey"
      };
    case "seats":
      return {
        title: "Select Your Seats",
        description: "Choose your preferred seats for the journey"
      };
    case "payment":
      return {
        title: "Payment Details",
        description: "Complete your booking with secure payment"
      };
    case "confirmation":
      return {
        title: "Booking Confirmed",
        description: "Your booking has been successfully completed"
      };
    default:
      return {
        title: "CamBus",
        description: "Your journey starts here"
      };
  }
};

export const isAuthStep = (step: Step): boolean => {
  return ["auth", "signup", "admin-signup", "forgot-password"].includes(step);
};

export const getProgressPercentage = (step: Step): number => {
  switch (step) {
    case "auth":
    case "signup":
    case "admin-signup":
    case "forgot-password":
      return 0;
    case "buses":
      return 25;
    case "seats":
      return 50;
    case "payment":
      return 75;
    case "confirmation":
      return 100;
    default:
      return 0;
  }
};
