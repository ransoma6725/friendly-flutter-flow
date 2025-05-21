
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
  const { bookings, confirmBookingPayment } = useBookings();
  const { toast } = useToast();

  const handleConfirmPayment = (bookingId: string) => {
    confirmBookingPayment(bookingId);
    toast({
      title: "Payment confirmed",
      description: `Booking #${bookingId} has been marked as paid.`,
    });
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
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.userName}</TableCell>
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
                        {booking.paymentConfirmed ? (
                          <Badge className="bg-green-500">Confirmed</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {!booking.paymentConfirmed && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmPayment(booking.id)}
                          >
                            Confirm Payment
                          </Button>
                        )}
                        {booking.paymentConfirmed && (
                          <span className="text-green-600 text-sm">
                            Payment verified
                          </span>
                        )}
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
