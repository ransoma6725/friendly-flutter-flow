
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordFormProps {
  onBack: () => void;
  onResetPassword: (email: string) => void;
}

const ForgotPasswordForm = ({ onBack, onResetPassword }: ForgotPasswordFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    onResetPassword(email);
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Check Your Email</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="w-full gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="rounded-full bg-primary/10 p-3 mb-2">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Forgot Password</h2>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition-all duration-200"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="w-full"
        >
          Back to Login
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
