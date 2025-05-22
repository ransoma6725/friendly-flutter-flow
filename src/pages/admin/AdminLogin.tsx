
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AdminSignInForm from "@/components/AdminSignInForm";
import { useToast } from "@/hooks/use-toast";
import { Bus } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useEffect } from "react";

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

  const handleAdminSignIn = (email: string, password: string) => {
    // In a real app, verify admin credentials against Supabase or your backend
    // This is a simplified mock authentication
    if (email === "admin@cambus.com" && password === "adminpass") {
      // Set admin authentication in localStorage and context
      localStorage.setItem("cambus_admin_auth", JSON.stringify({
        isAdmin: true,
        adminEmail: email,
        timestamp: new Date().getTime()
      }));
      
      // Update admin context state
      adminLogin(email);
      
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid admin credentials",
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
