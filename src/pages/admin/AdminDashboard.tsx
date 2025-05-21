
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bus, Route, Package, Clock, Users } from "lucide-react";
import { adminSidebarItems } from "@/constants/sidebarItems";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Buses", value: "24", icon: Bus, color: "bg-blue-100 text-blue-700" },
    { title: "Available Routes", value: "18", icon: Route, color: "bg-green-100 text-green-700" },
    { title: "Packages", value: "146", icon: Package, color: "bg-amber-100 text-amber-700" },
    { title: "Active Bookings", value: "87", icon: Clock, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} userName="Admin" userRole="Administrator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agency Dashboard</h1>
          <p className="text-muted-foreground">Manage your buses, routes, and schedules</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Overview of recent bookings and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Customer</div>
                  <div>Route</div>
                  <div>Status</div>
                </div>
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="grid grid-cols-3 items-center">
                    <div className="font-medium">Customer {i + 1}</div>
                    <div>Douala to Yaoundé</div>
                    <div className="rounded-full bg-green-100 text-green-700 text-xs px-2 py-1 w-fit">
                      Confirmed
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bus Occupancy</CardTitle>
              <CardDescription>Average occupancy by route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Douala-Yaoundé", "Bamenda-Douala", "Buea-Limbe"].map((route, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>{route}</div>
                      <div className="font-medium">{75 - i * 10}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${75 - i * 10}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
