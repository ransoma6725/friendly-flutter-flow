
import { useState } from "react";
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

interface BusData {
  id: string;
  name: string;
  plateNumber: string;
  capacity: number;
  status: "active" | "maintenance" | "inactive";
}

const initialBuses: BusData[] = [
  { id: "1", name: "Camair Express", plateNumber: "SW-123-XA", capacity: 45, status: "active" },
  { id: "2", name: "Garanti Express", plateNumber: "LT-456-YB", capacity: 50, status: "active" },
  { id: "3", name: "Cardinal Express", plateNumber: "CE-789-ZC", capacity: 55, status: "maintenance" },
  { id: "4", name: "Moghamo Express", plateNumber: "NW-012-VD", capacity: 40, status: "inactive" },
  { id: "5", name: "Touristique Express", plateNumber: "SW-345-WE", capacity: 48, status: "active" },
];

const AdminBuses = () => {
  const { toast } = useToast();
  const [buses, setBuses] = useState<BusData[]>(initialBuses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<BusData | null>(null);
  const [newBus, setNewBus] = useState<Partial<BusData>>({
    name: "",
    plateNumber: "",
    capacity: 45,
    status: "active"
  });

  const handleSaveBus = () => {
    if (!newBus.name || !newBus.plateNumber) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (editingBus) {
      // Update existing bus
      setBuses(buses.map(bus => 
        bus.id === editingBus.id ? { ...bus, ...newBus } as BusData : bus
      ));
      
      toast({
        title: "Bus updated",
        description: `${newBus.name} has been updated successfully.`,
      });
    } else {
      // Add new bus
      const id = Date.now().toString();
      setBuses([...buses, { id, ...newBus } as BusData]);
      
      toast({
        title: "Bus added",
        description: `${newBus.name} has been added successfully.`,
      });
    }
    
    setDialogOpen(false);
    setNewBus({
      name: "",
      plateNumber: "",
      capacity: 45,
      status: "active"
    });
    setEditingBus(null);
  };

  const handleEditBus = (bus: BusData) => {
    setEditingBus(bus);
    setNewBus({ ...bus });
    setDialogOpen(true);
  };

  const handleDeleteBus = (id: string) => {
    setBuses(buses.filter(bus => bus.id !== id));
    
    toast({
      title: "Bus deleted",
      description: "The bus has been removed successfully.",
    });
  };

  const getStatusBadge = (status: BusData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Maintenance</Badge>;
      case "inactive":
        return <Badge variant="outline" className="border-red-500 text-red-500">Inactive</Badge>;
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
                  plateNumber: "",
                  capacity: 45,
                  status: "active"
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
                    Name
                  </label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newBus.name}
                    onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="plateNumber" className="text-right">
                    Plate Number
                  </label>
                  <Input
                    id="plateNumber"
                    className="col-span-3"
                    value={newBus.plateNumber}
                    onChange={(e) => setNewBus({ ...newBus, plateNumber: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="capacity" className="text-right">
                    Capacity
                  </label>
                  <Input
                    id="capacity"
                    type="number"
                    className="col-span-3"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({ 
                      ...newBus, 
                      capacity: parseInt(e.target.value) || 0 
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <select
                    id="status"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newBus.status}
                    onChange={(e) => setNewBus({ 
                      ...newBus, 
                      status: e.target.value as BusData["status"]
                    })}
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.name}</TableCell>
                  <TableCell>{bus.plateNumber}</TableCell>
                  <TableCell>{bus.capacity} seats</TableCell>
                  <TableCell>{getStatusBadge(bus.status)}</TableCell>
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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminBuses;
