
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
  onBack: () => void;
  onSignUp: (userData: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => void;
}

const SignUpForm = ({ onBack, onSignUp }: SignUpFormProps) => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(237|00237|\+237)?[6-9]\d{8}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid Cameroonian phone number";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit the form if validation passes
      onSignUp({
        fullName,
        phone,
        email,
        password
      });
    } else {
      toast({
        title: "Form Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="rounded-full bg-primary/10 p-3 mb-2">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Create an Account</h2>
        <p className="text-sm text-muted-foreground">Sign up to start booking bus tickets</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={errors.fullName ? "border-destructive" : ""}
            required
          />
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
            required
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-destructive" : ""}
            required
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-destructive" : ""}
            required
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "border-destructive" : ""}
            required
          />
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
        </div>
        
        <Button type="submit" className="w-full">
          Create Account
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

export default SignUpForm;
