
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Plus } from "lucide-react";
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

const initialSchedules: ScheduleData[] = [
  {
    id: "1",
    busName: "Camair Express",
    route: "Douala → Yaoundé",
    departureTime: "07:30",
    arrivalTime: "10:45",
    driver: "Tabi James",
    status: "scheduled",
    price: 5000,
    availableSeats: 28,
    totalSeats: 45
  },
  {
    id: "2",
    busName: "Garanti Express",
    route: "Yaoundé → Bamenda",
    departureTime: "09:00",
    arrivalTime: "15:30",
    driver: "Epie Marcus",
    status: "departed",
    price: 7500,
    availableSeats: 12,
    totalSeats: 50
  },
  {
    id: "3",
    busName: "Cardinal Express",
    route: "Douala → Limbe",
    departureTime: "12:15",
    arrivalTime: "13:45",
    driver: "Mbarga Paul",
    status: "arrived",
    price: 2000,
    availableSeats: 0,
    totalSeats: 55
  },
  {
    id: "4",
    busName: "Moghamo Express",
    route: "Bamenda → Buea",
    departureTime: "06:00",
    arrivalTime: "12:30",
    driver: "Fon Peter",
    status: "scheduled",
    price: 5500,
    availableSeats: 40,
    totalSeats: 40
  }
];

const AdminSchedules = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<ScheduleData[]>(initialSchedules);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredSchedules = filterStatus === "all" 
    ? schedules 
    : schedules.filter(schedule => schedule.status === filterStatus);
  
  const getStatusBadge = (status: ScheduleData["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Scheduled</Badge>;
      case "departed":
        return <Badge className="bg-amber-500">Departed</Badge>;
      case "arrived":
        return <Badge className="bg-green-500">Arrived</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, status: ScheduleData["status"]) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, status } : schedule
    ));
    
    toast({
      title: "Status updated",
      description: `Schedule status changed to ${status}.`,
    });
  };

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
            New Schedule
          </Button>
        </div>
        
        <Card>
          <div className="p-4 flex justify-between items-center">
            <Input 
              placeholder="Search schedules..." 
              className="max-w-xs"
            />
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="departed">Departed</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.busName}</TableCell>
                  <TableCell>{schedule.route}</TableCell>
                  <TableCell>{schedule.departureTime}</TableCell>
                  <TableCell>{schedule.arrivalTime}</TableCell>
                  <TableCell>{schedule.driver}</TableCell>
                  <TableCell>{schedule.price.toLocaleString()} XAF</TableCell>
                  <TableCell>
                    {schedule.availableSeats}/{schedule.totalSeats}
                  </TableCell>
                  <TableCell>
                    <select
                      className="p-1 text-xs border rounded"
                      value={schedule.status}
                      onChange={(e) => handleUpdateStatus(schedule.id, e.target.value as ScheduleData["status"])}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="departed">Departed</option>
                      <option value="arrived">Arrived</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSchedules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Clock className="h-8 w-8 mb-2" />
                      <p>No schedules found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSchedules;
