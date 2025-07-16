
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil, Trash, Bus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";
import { supabase } from "@/integrations/supabase/client";

interface BusData {
  id: string;
  name: string;
  from_location: string;
  to_location: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
  total_seats: number;
}

const AdminBuses = () => {
  const { toast } = useToast();
  const [buses, setBuses] = useState<BusData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<BusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newBus, setNewBus] = useState<Partial<BusData>>({
    name: "",
    from_location: "",
    to_location: "",
    departure_time: "",
    arrival_time: "",
    price: 0,
    available_seats: 0,
    total_seats: 0
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('buses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBuses(data || []);
    } catch (error) {
      console.error('Error fetching buses:', error);
      toast({
        title: "Error",
        description: "Failed to load buses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBus = async () => {
    if (!newBus.name || !newBus.from_location || !newBus.to_location) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingBus) {
        const { error } = await supabase
          .from('buses')
          .update({
            name: newBus.name,
            from_location: newBus.from_location,
            to_location: newBus.to_location,
            departure_time: newBus.departure_time,
            arrival_time: newBus.arrival_time,
            price: newBus.price || 0,
            available_seats: newBus.available_seats || 0,
            total_seats: newBus.total_seats || 0
          })
          .eq('id', editingBus.id);

        if (error) throw error;
        
        toast({
          title: "Bus updated",
          description: `${newBus.name} has been updated successfully.`,
        });
      } else {
        const { error } = await supabase
          .from('buses')
          .insert([{
            name: newBus.name,
            from_location: newBus.from_location,
            to_location: newBus.to_location,
            departure_time: newBus.departure_time,
            arrival_time: newBus.arrival_time,
            price: newBus.price || 0,
            available_seats: newBus.available_seats || 0,
            total_seats: newBus.total_seats || 0
          }]);

        if (error) throw error;
        
        toast({
          title: "Bus added",
          description: `${newBus.name} has been added successfully.`,
        });
      }
      
      setDialogOpen(false);
      setNewBus({
        name: "",
        from_location: "",
        to_location: "",
        departure_time: "",
        arrival_time: "",
        price: 0,
        available_seats: 0,
        total_seats: 0
      });
      setEditingBus(null);
      await fetchBuses();
    } catch (error) {
      console.error('Error saving bus:', error);
      toast({
        title: "Error",
        description: "Failed to save bus",
        variant: "destructive",
      });
    }
  };

  const handleEditBus = (bus: BusData) => {
    setEditingBus(bus);
    setNewBus({ ...bus });
    setDialogOpen(true);
  };

  const handleDeleteBus = async (id: string) => {
    try {
      const { error } = await supabase
        .from('buses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Bus deleted",
        description: "The bus has been removed successfully.",
      });
      
      await fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error);
      toast({
        title: "Error",
        description: "Failed to delete bus",
        variant: "destructive",
      });
    }
  };


  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Buses</h1>
            <p className="text-muted-foreground">Manage your bus fleet</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingBus(null);
                setNewBus({
                  name: "",
                  from_location: "",
                  to_location: "",
                  departure_time: "",
                  arrival_time: "",
                  price: 0,
                  available_seats: 0,
                  total_seats: 0
                });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Bus
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBus ? "Edit Bus" : "Add New Bus"}</DialogTitle>
                <DialogDescription>
                  Enter the details of the bus below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Bus Name
                  </label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newBus.name}
                    onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="from_location" className="text-right">
                    From
                  </label>
                  <Input
                    id="from_location"
                    className="col-span-3"
                    value={newBus.from_location}
                    onChange={(e) => setNewBus({ ...newBus, from_location: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="to_location" className="text-right">
                    To
                  </label>
                  <Input
                    id="to_location"
                    className="col-span-3"
                    value={newBus.to_location}
                    onChange={(e) => setNewBus({ ...newBus, to_location: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="departure_time" className="text-right">
                    Departure Time
                  </label>
                  <Input
                    id="departure_time"
                    type="datetime-local"
                    className="col-span-3"
                    value={newBus.departure_time}
                    onChange={(e) => setNewBus({ ...newBus, departure_time: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="arrival_time" className="text-right">
                    Arrival Time
                  </label>
                  <Input
                    id="arrival_time"
                    type="datetime-local"
                    className="col-span-3"
                    value={newBus.arrival_time}
                    onChange={(e) => setNewBus({ ...newBus, arrival_time: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right">
                    Price (XAF)
                  </label>
                  <Input
                    id="price"
                    type="number"
                    className="col-span-3"
                    value={newBus.price}
                    onChange={(e) => setNewBus({ ...newBus, price: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="total_seats" className="text-right">
                    Total Seats
                  </label>
                  <Input
                    id="total_seats"
                    type="number"
                    className="col-span-3"
                    value={newBus.total_seats}
                    onChange={(e) => setNewBus({ ...newBus, total_seats: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="available_seats" className="text-right">
                    Available Seats
                  </label>
                  <Input
                    id="available_seats"
                    type="number"
                    className="col-span-3"
                    value={newBus.available_seats}
                    onChange={(e) => setNewBus({ ...newBus, available_seats: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={handleSaveBus}>
                  {editingBus ? "Save Changes" : "Add Bus"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <div className="p-4">
            <Input 
              placeholder="Search buses..." 
              className="max-w-sm" 
            />
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-pulse">Loading buses...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Name</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell className="font-medium">{bus.name}</TableCell>
                    <TableCell>{bus.from_location} → {bus.to_location}</TableCell>
                    <TableCell>{new Date(bus.departure_time).toLocaleString()}</TableCell>
                    <TableCell>{bus.price?.toLocaleString()} XAF</TableCell>
                    <TableCell>{bus.available_seats}/{bus.total_seats}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditBus(bus)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteBus(bus.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && buses.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No buses found. Add your first bus to get started.
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminBuses;
