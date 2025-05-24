
export type AppState = "auth" | "signup" | "forgot-password" | "buses" | "seats" | "payment" | "confirmation";

export const getStepInfo = (step: AppState) => {
  switch(step) {
    case "auth":
      return { title: "CamBus Ticketing System", description: "Sign in to book your bus tickets easily" };
    case "signup":
      return { title: "Create Account", description: "Register to access our bus ticketing services" };
    case "forgot-password":
      return { title: "Reset Password", description: "Recover access to your account" };
    case "buses":
      return { title: "Select Your Route", description: "Browse available buses and routes" };
    case "seats":
      return { title: "Choose Your Seats", description: "Select your preferred seats" };
    case "payment":
      return { title: "Payment Details", description: "Complete your payment to confirm booking" };
    case "confirmation":
      return { title: "Booking Confirmed", description: "Your ticket has been booked successfully" };
    default:
      return { title: "", description: "" };
  }
};

export const getProgressPercentage = (step: AppState): number => {
  switch(step) {
    case "auth": 
    case "signup": 
    case "forgot-password": return 25;
    case "buses": return 50;
    case "seats": return 75;
    case "payment": 
    case "confirmation": return 100;
    default: return 0;
  }
};

export const isAuthStep = (step: AppState): boolean => {
  return ["auth", "signup", "forgot-password"].includes(step);
};
