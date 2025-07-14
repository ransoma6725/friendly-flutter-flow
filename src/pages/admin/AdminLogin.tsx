
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
      
      // Check credentials directly against admin_users table
      const { data: adminUsers, error: adminError } = await supabase
        .from('admin_users')
        .select('email, password')
        .eq('email', email)
        .eq('password', password);

      console.log("Admin query result:", { adminUsers, adminError });

      if (adminError) {
        console.error("Admin query error:", adminError);
        throw new Error('Database error occurred. Please try again.');
      }

      if (!adminUsers || adminUsers.length === 0) {
        console.error("No admin user found with provided credentials");
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
            
            {/* Updated admin credentials info */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Admin Login Credentials:</strong><br />
                <strong>Option 1:</strong><br />
                Email: admin@cambus.com<br />
                Password: admin123<br />
                <br />
                <strong>Option 2:</strong><br />
                Email: superadmin@cambus.com<br />
                Password: superadmin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
