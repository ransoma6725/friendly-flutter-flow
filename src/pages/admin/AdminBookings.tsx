
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";
import { useBookings } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminBookings = () => {
  const { bookings, confirmBookingPayment, rejectBooking } = useBookings();
  const { toast } = useToast();

  const handleConfirmPayment = async (bookingId: string) => {
    try {
      await confirmBookingPayment(bookingId);
      toast({
        title: "Payment confirmed",
        description: `Booking #${bookingId} has been marked as paid.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive",
      });
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      await rejectBooking(bookingId);
      toast({
        title: "Booking rejected",
        description: `Booking #${bookingId} has been rejected.`,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject booking",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (booking: any) => {
    if (booking.status === 'confirmed' || booking.paymentConfirmed) {
      return <Badge className="bg-green-500">Confirmed</Badge>;
    } else if (booking.status === 'rejected') {
      return <Badge variant="destructive">Rejected</Badge>;
    } else {
      return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} userName="Admin" userRole="Administrator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground">Review and confirm customer bookings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              Confirm payments and approve ticket downloads
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No bookings to display.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id.slice(0, 8)}</TableCell>
                      <TableCell>
                        <div>{booking.userName}</div>
                        <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                      </TableCell>
                      <TableCell>
                        {booking.bus.from} → {booking.bus.to}
                      </TableCell>
                      <TableCell>
                        {booking.seatIds.join(", ")}
                        <span className="text-muted-foreground ml-1">
                          ({booking.seatIds.length})
                        </span>
                      </TableCell>
                      <TableCell>
                        {booking.totalAmount.toLocaleString()} XAF
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(booking)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleConfirmPayment(booking.id)}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectBooking(booking.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <span className="text-green-600 text-sm">
                              Payment verified
                            </span>
                          )}
                          {booking.status === 'rejected' && (
                            <span className="text-red-600 text-sm">
                              Booking rejected
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;
