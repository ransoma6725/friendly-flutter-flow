
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AdminSignInForm from "@/components/AdminSignInForm";
import { useToast } from "@/hooks/use-toast";
import { Bus } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminAuth } = useAdmin();

  // If already authenticated as admin, redirect to admin dashboard
  useEffect(() => {
    if (adminAuth.isAdmin) {
      navigate("/admin");
    }
  }, [adminAuth.isAdmin, navigate]);

  const handleAdminSignIn = async (email: string, password: string) => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide specific error messages
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please check your credentials.");
        } else if (error.message.includes("Email not confirmed")) {
          throw new Error("Please confirm your email before signing in.");
        } else {
          throw error;
        }
      }

      // Check if user is in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .single();

      if (adminError || !adminUser) {
        await supabase.auth.signOut();
        throw new Error('This account does not have admin privileges. Please contact the system administrator.');
      }

      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard",
      });
      
      navigate("/admin");
    } catch (error: any) {
      console.error("Admin login error:", error);
      toast({
        title: "Authentication failed",
        description: error.message || "Invalid admin credentials",
        variant: "destructive",
      });
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
            <AdminSignInForm onAdminSignIn={handleAdminSignIn} />
            
            {/* Helper text for testing */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Test Admin Account:</strong><br />
                Email: admin@cambus.com<br />
                <span className="text-xs">
                  Note: You must first create this account through the regular signup process, then it will have admin access.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
