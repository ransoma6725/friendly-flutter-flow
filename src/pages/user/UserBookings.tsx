
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { userSidebarItems } from "@/constants/sidebarItems";

interface Booking {
  id: string;
  date: string;
  busName: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  seats: string[];
  price: number;
  status: "upcoming" | "completed" | "cancelled";
}

const initialBookings: Booking[] = [
  {
    id: "BK-001",
    date: "2025-05-25",
    busName: "Camair Express",
    route: "Douala → Yaoundé",
    departureTime: "07:30",
    arrivalTime: "10:45",
    seats: ["A4", "A5"],
    price: 10000,
    status: "upcoming"
  },
  {
    id: "BK-002",
    date: "2025-05-10",
    busName: "Garanti Express",
    route: "Yaoundé → Bamenda",
    departureTime: "09:00",
    arrivalTime: "15:30",
    seats: ["B12"],
    price: 7500,
    status: "completed"
  },
  {
    id: "BK-003",
    date: "2025-04-18",
    busName: "Cardinal Express",
    route: "Douala → Limbe",
    departureTime: "12:15",
    arrivalTime: "13:45",
    seats: ["C7"],
    price: 2000,
    status: "completed"
  },
  {
    id: "BK-004",
    date: "2025-04-02",
    busName: "Moghamo Express",
    route: "Bamenda → Buea",
    departureTime: "06:00",
    arrivalTime: "12:30",
    seats: ["D9", "D10"],
    price: 11000,
    status: "cancelled"
  },
  {
    id: "BK-005",
    date: "2025-05-30",
    busName: "Touristique Express",
    route: "Douala → Bafoussam",
    departureTime: "08:45",
    arrivalTime: "13:20",
    seats: ["E3"],
    price: 6000,
    status: "upcoming"
  }
];

const UserBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings
    .filter(booking => 
      filterStatus === "all" || booking.status === filterStatus
    )
    .filter(booking =>
      booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.busName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "cancelled" as const } : booking
    ));
    
    toast({
      title: "Booking cancelled",
      description: `Booking ${id} has been cancelled.`,
    });
  };
  
  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="border-red-500 text-red-500">Cancelled</Badge>;
    }
  };

  return (
    <DashboardLayout sidebarItems={userSidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
          <p className="text-muted-foreground">View and manage your past and upcoming trips</p>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex-1 relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <div>{booking.route}</div>
                        <div className="text-xs text-muted-foreground">{booking.busName}</div>
                      </TableCell>
                      <TableCell>
                        <div>{booking.departureTime}</div>
                        <div className="text-xs text-muted-foreground">→ {booking.arrivalTime}</div>
                      </TableCell>
                      <TableCell>{booking.seats.join(", ")}</TableCell>
                      <TableCell>{booking.price.toLocaleString()} XAF</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        {booking.status === "upcoming" && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Calendar className="h-8 w-8 mb-2" />
                          <p>No bookings found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserBookings;
