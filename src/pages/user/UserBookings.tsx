import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface BookingWithDetails {
  id: string;
  booking_date: string;
  departure_date: string;
  total_price: number;
  payment_confirmed: boolean;
  bus: {
    name: string;
    from_location: string;
    to_location: string;
    departure_time: string;
    arrival_time: string;
  };
  booking_seats: {
    seat: {
      number: string;
    };
  }[];
}

const UserBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          departure_date,
          total_price,
          payment_confirmed,
          bus:buses (
            name,
            from_location,
            to_location,
            departure_time,
            arrival_time
          ),
          booking_seats (
            seat:seats (
              number
            )
          )
        `)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings
    .filter(booking => {
      if (filterStatus === "all") return true;
      if (filterStatus === "confirmed") return booking.payment_confirmed;
      if (filterStatus === "pending") return !booking.payment_confirmed;
      return true;
    })
    .filter(booking =>
      booking.bus.from_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus.to_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusBadge = (payment_confirmed: boolean, departure_date: string) => {
    const now = new Date();
    const departureTime = new Date(departure_date);
    
    if (!payment_confirmed) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending Payment</Badge>;
    }
    
    if (departureTime < now) {
      return <Badge className="bg-green-500">Completed</Badge>;
    }
    
    return <Badge className="bg-blue-500">Upcoming</Badge>;
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <DashboardLayout sidebarItems={userSidebarItems}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your bookings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending Payment</SelectItem>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id.slice(0, 8)}</TableCell>
                      <TableCell>{formatDate(booking.departure_date)}</TableCell>
                      <TableCell>
                        <div>{booking.bus.from_location} → {booking.bus.to_location}</div>
                        <div className="text-xs text-muted-foreground">{booking.bus.name}</div>
                      </TableCell>
                      <TableCell>
                        <div>{formatTime(booking.bus.departure_time)}</div>
                        <div className="text-xs text-muted-foreground">→ {formatTime(booking.bus.arrival_time)}</div>
                      </TableCell>
                      <TableCell>
                        {booking.booking_seats.map(bs => bs.seat.number).join(", ")}
                      </TableCell>
                      <TableCell>{booking.total_price.toLocaleString()} XAF</TableCell>
                      <TableCell>
                        {getStatusBadge(booking.payment_confirmed, booking.departure_date)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
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