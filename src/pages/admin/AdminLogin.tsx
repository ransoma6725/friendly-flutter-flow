
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
      console.log("Attempting admin login with:", email);
      
      // Check credentials directly against admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email, password')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (adminError || !adminUser) {
        console.error("Admin login error:", adminError);
        throw new Error('Invalid admin credentials. Please check your email and password.');
      }

      // If credentials match, sign in with Supabase Auth (or create session if user doesn't exist)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If user doesn't exist in auth, we'll still allow admin access based on admin_users table
      if (authError && authError.message.includes("Invalid login credentials")) {
        console.log("User not in auth.users, but valid admin credentials found");
        // Manually set admin state since credentials are valid
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin");
        return;
      }

      if (authError) {
        throw authError;
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
            
            {/* Admin credentials info */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Admin Login Credentials:</strong><br />
                Email: admin@cambus.com<br />
                Password: admin pass
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
