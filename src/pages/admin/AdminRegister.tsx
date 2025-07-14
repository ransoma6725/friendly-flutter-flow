
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bus, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Creating admin account with email:", email);
      
      // Check if admin already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email);

      if (checkError) {
        console.error("Error checking existing admin:", checkError);
        throw new Error('Database error occurred. Please try again.');
      }

      if (existingAdmin && existingAdmin.length > 0) {
        throw new Error('An admin account with this email already exists.');
      }

      // Create new admin user
      const { data, error } = await supabase
        .from('admin_users')
        .insert([
          {
            id: crypto.randomUUID(),
            email: email,
            password: password,
          }
        ])
        .select();

      console.log("Admin creation result:", { data, error });

      if (error) {
        console.error("Admin creation error:", error);
        throw new Error('Failed to create admin account. Please try again.');
      }

      toast({
        title: "Success",
        description: "Admin account created successfully!",
      });

      // Redirect to admin login
      navigate("/admin/login");
      
    } catch (error: any) {
      console.error("Admin registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-hero-pattern">
      <div className="max-w-md mx-auto py-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Bus className="h-7 w-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            CamBus <span className="text-primary">Admin</span>
          </h1>
        </div>

        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Create Admin Account</h2>
                <p className="text-sm text-muted-foreground">Register a new admin user</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-200"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-200"
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="transition-all duration-200"
                    required
                    minLength={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Admin Account"}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => navigate("/admin/login")}
                  className="text-sm"
                >
                  Already have an admin account? Sign in
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegister;
