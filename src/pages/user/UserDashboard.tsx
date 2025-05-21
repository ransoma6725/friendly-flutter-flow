
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, MapPin, Package, User } from "lucide-react";
import { userSidebarItems } from "@/constants/sidebarItems";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const navigate = useNavigate();
  
  const recentBookings = [
    { 
      id: "BK001", 
      date: "2025-05-18", 
      bus: "Camair Express",
      route: "Douala → Yaoundé", 
      seats: "A4, A5",
      status: "confirmed" 
    },
    { 
      id: "BK002", 
      date: "2025-05-10", 
      bus: "Garanti Express",
      route: "Yaoundé → Bamenda", 
      seats: "B12",
      status: "completed" 
    }
  ];
  
  const recentPackages = [
    {
      trackingId: "PKG-123-XYZ",
      date: "2025-05-15",
      route: "Douala → Yaoundé",
      status: "delivered"
    },
    {
      trackingId: "PKG-456-ABC",
      date: "2025-05-19",
      route: "Bamenda → Buea",
      status: "in-transit"
    }
  ];

  return (
    <DashboardLayout sidebarItems={userSidebarItems} userName="John Doe" userRole="User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John Doe!</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <div className="rounded-full p-2 bg-blue-100 text-blue-700">
                <Calendar className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">2 recent bookings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Parcels Sent</CardTitle>
              <div className="rounded-full p-2 bg-green-100 text-green-700">
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">1 in transit</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saved Routes</CardTitle>
              <div className="rounded-full p-2 bg-purple-100 text-purple-700">
                <MapPin className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">Favorite destinations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <div className="rounded-full p-2 bg-amber-100 text-amber-700">
                <User className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-muted-foreground">Profile completed</div>
              <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Your most recent bus tickets</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/user/bookings")}
                >
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{booking.route}</div>
                        <div className="text-sm text-muted-foreground">{booking.date} · {booking.bus}</div>
                        <div className="text-sm mt-1">Seat(s): {booking.seats}</div>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === "confirmed" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {booking.status === "confirmed" ? "Confirmed" : "Completed"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Calendar className="h-10 w-10 mb-2" />
                  <p>No recent bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Parcels</CardTitle>
                  <CardDescription>Track your package shipments</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/user/tracking")}
                >
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentPackages.length > 0 ? (
                <div className="space-y-4">
                  {recentPackages.map((pkg) => (
                    <div key={pkg.trackingId} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{pkg.route}</div>
                        <div className="text-sm text-muted-foreground">{pkg.date}</div>
                        <div className="text-xs mt-1">Tracking ID: {pkg.trackingId}</div>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          pkg.status === "delivered" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {pkg.status === "delivered" ? "Delivered" : "In Transit"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Package className="h-10 w-10 mb-2" />
                  <p>No recent packages</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              Book New Trip
            </Button>
            <Button variant="outline">Send Package</Button>
            <Button variant="outline">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
