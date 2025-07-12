
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield } from "lucide-react";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => void;
  onCreateAccount: () => void;
  onCreateAdminAccount: () => void;
  onForgotPassword: () => void;
}

const SignInForm = ({ onSignIn, onCreateAccount, onCreateAdminAccount, onForgotPassword }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="rounded-full bg-primary/10 p-3 mb-2">
          <User className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button 
              type="button" 
              onClick={onForgotPassword}
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="transition-all duration-200"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        
        <div className="flex flex-col gap-2">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <button 
              type="button" 
              onClick={onCreateAccount}
              className="text-primary hover:underline font-medium"
            >
              Create Account
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={onCreateAdminAccount}
            className="w-full flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Create Admin Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
