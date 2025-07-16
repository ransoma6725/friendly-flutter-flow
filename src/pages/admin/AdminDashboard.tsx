
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Bus, Calendar, Settings, BarChart3, Shield } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { adminAuth, adminLogout } = useAdmin();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuses: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const { count: usersCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        // Fetch buses count
        const { count: busesCount } = await supabase
          .from('buses')
          .select('*', { count: 'exact', head: true });

        // Fetch bookings count and total revenue
        const { data: bookings, count: bookingsCount } = await supabase
          .from('bookings')
          .select('total_price', { count: 'exact' });

        const totalRevenue = bookings?.reduce((sum, booking) => sum + booking.total_price, 0) || 0;

        setStats({
          totalUsers: usersCount || 0,
          totalBuses: busesCount || 0,
          totalBookings: bookingsCount || 0,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      }
    };

    fetchStats();
  }, [toast]);

  const sidebarItems = [
    {
      label: "Management",
      items: [
        { title: "Dashboard", path: "/admin", icon: BarChart3 },
        { title: "Users", path: "/admin/users", icon: Users },
        { title: "Buses", path: "/admin/buses", icon: Bus },
        { title: "Bookings", path: "/admin/bookings", icon: Calendar },
        { title: "Routes", path: "/admin/routes", icon: Settings },
      ],
    },
  ];

  const handleLogout = async () => {
    await adminLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userName={adminAuth.adminEmail || "Admin"}
      userRole="Administrator"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {adminAuth.adminEmail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Administrator
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBuses}</div>
              <p className="text-xs text-muted-foreground">
                Active buses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                All time bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} XAF</div>
              <p className="text-xs text-muted-foreground">
                Total earnings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Users className="h-5 w-5" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Bus className="h-5 w-5" />
                Add New Bus
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                View Bookings
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Admin Email:</strong> {adminAuth.adminEmail}
              </p>
              <p className="text-sm">
                <strong>Login Time:</strong> {new Date().toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>System Status:</strong> <Badge variant="secondary" className="ml-2">Online</Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
