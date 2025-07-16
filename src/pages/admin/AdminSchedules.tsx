import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Clock, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";

interface ScheduleData {
  id: string;
  busName: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  driver: string;
  status: "scheduled" | "departed" | "arrived" | "cancelled";
  price: number;
  availableSeats: number;
  totalSeats: number;
}

const AdminSchedules = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sampleSchedules: ScheduleData[] = [
      {
        id: "1",
        busName: "Camair Express",
        route: "Yaoundé → Douala",
        departureTime: "2024-01-20T08:00:00",
        arrivalTime: "2024-01-20T11:30:00",
        driver: "Jean Mballa",
        status: "scheduled",
        price: 25000,
        availableSeats: 35,
        totalSeats: 45
      }
    ];
    setSchedules(sampleSchedules);
  }, []);

  const getStatusBadge = (status: ScheduleData["status"]) => {
    const statusConfig = {
      scheduled: { color: "bg-blue-100 text-blue-800", label: "Scheduled" },
      departed: { color: "bg-yellow-100 text-yellow-800", label: "Departed" },
      arrived: { color: "bg-green-100 text-green-800", label: "Arrived" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredSchedules = schedules.filter(schedule =>
    schedule.busName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedules</h1>
            <p className="text-muted-foreground">Manage bus schedules and departures</p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>

        <Card>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schedules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus & Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{schedule.busName}</div>
                      <div className="text-sm text-muted-foreground">{schedule.route}</div>
                    </div>
                  </TableCell>
                  <TableCell>{schedule.driver}</TableCell>
                  <TableCell>{new Date(schedule.departureTime).toLocaleString()}</TableCell>
                  <TableCell>{schedule.price.toLocaleString()} XAF</TableCell>
                  <TableCell>{schedule.availableSeats}/{schedule.totalSeats}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSchedules;