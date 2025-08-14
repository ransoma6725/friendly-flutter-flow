
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AdminSignInForm from "@/components/AdminSignInForm";
import { useToast } from "@/hooks/use-toast";
import { Bus } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminAuth, adminLogin } = useAdmin();

  // If already authenticated as admin, redirect to admin dashboard
  useEffect(() => {
    if (adminAuth.isAdmin) {
      navigate("/admin");
    }
  }, [adminAuth.isAdmin, navigate]);

  const handleAdminSignIn = async (email: string, password: string) => {
    try {
      console.log("Attempting admin login with:", email);
      
      // Use secure edge function for admin authentication
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, password }
      });

      console.log("Admin auth result:", { data, error });

      if (error) {
        console.error("Admin auth error:", error);
        throw new Error('Authentication failed. Please try again.');
      }

      if (!data?.success) {
        console.error("Invalid admin credentials");
        throw new Error('Invalid admin credentials. Please check your email and password.');
      }

      // If credentials match, set admin state
      adminLogin(email);
      
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
            
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/register")}
                className="w-full"
              >
                Create New Admin Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
