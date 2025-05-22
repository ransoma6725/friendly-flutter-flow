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
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";

interface RouteData {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: "active" | "suspended";
}

const initialRoutes: RouteData[] = [
  { id: "1", from: "Douala", to: "Yaoundé", distance: 220, price: 5000, status: "active" },
  { id: "2", from: "Yaoundé", to: "Bamenda", distance: 366, price: 7500, status: "active" },
  { id: "3", from: "Douala", to: "Limbe", distance: 65, price: 2000, status: "active" },
  { id: "4", from: "Douala", to: "Bafoussam", distance: 295, price: 6000, status: "suspended" },
  { id: "5", from: "Bamenda", to: "Buea", distance: 214, price: 5500, status: "active" },
  // New routes
  { id: "6", from: "Yaoundé", to: "Dschang", distance: 335, price: 7000, status: "active" },
  { id: "7", from: "Douala", to: "Edea", distance: 60, price: 2000, status: "active" },
  { id: "8", from: "Yaoundé", to: "Ngaoundere", distance: 610, price: 11000, status: "active" },
  { id: "9", from: "Douala", to: "Nkongsamba", distance: 142, price: 3500, status: "active" },
  { id: "10", from: "Bamenda", to: "Foumban", distance: 170, price: 4500, status: "active" },
  { id: "11", from: "Yaoundé", to: "Foumbot", distance: 290, price: 6500, status: "active" },
  { id: "12", from: "Bafoussam", to: "Yaoundé", distance: 295, price: 6000, status: "active" },
];

const AdminRoutes = () => {
  const { toast } = useToast();
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [newRoute, setNewRoute] = useState<Partial<RouteData>>({
    from: "",
    to: "",
    distance: 0,
    price: 0,
    status: "active"
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = routes.filter(route => 
    route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveRoute = () => {
    if (!newRoute.from || !newRoute.to || !newRoute.distance || !newRoute.price) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (editingRoute) {
      // Update existing route
      setRoutes(routes.map(route => 
        route.id === editingRoute.id ? { ...route, ...newRoute } as RouteData : route
      ));
      
      toast({
        title: "Route updated",
        description: `${newRoute.from} to ${newRoute.to} has been updated.`,
      });
    } else {
      // Add new route
      const id = Date.now().toString();
      setRoutes([...routes, { id, ...newRoute } as RouteData]);
      
      toast({
        title: "Route added",
        description: `${newRoute.from} to ${newRoute.to} has been added.`,
      });
    }
    
    setDialogOpen(false);
    setNewRoute({
      from: "",
      to: "",
      distance: 0,
      price: 0,
      status: "active"
    });
    setEditingRoute(null);
  };

  const handleEditRoute = (route: RouteData) => {
    setEditingRoute(route);
    setNewRoute({ ...route });
    setDialogOpen(true);
  };

  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
    
    toast({
      title: "Route deleted",
      description: "The route has been removed successfully.",
    });
  };

  const getStatusBadge = (status: RouteData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="border-red-500 text-red-500">Suspended</Badge>;
    }
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Routes</h1>
            <p className="text-muted-foreground">Manage bus routes and destinations</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingRoute(null);
                setNewRoute({
                  from: "",
                  to: "",
                  distance: 0,
                  price: 0,
                  status: "active"
                });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingRoute ? "Edit Route" : "Add New Route"}</DialogTitle>
                <DialogDescription>
                  Enter the route details below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="from" className="text-right">
                    From
                  </label>
                  <Input
                    id="from"
                    className="col-span-3"
                    value={newRoute.from}
                    onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="to" className="text-right">
                    To
                  </label>
                  <Input
                    id="to"
                    className="col-span-3"
                    value={newRoute.to}
                    onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="distance" className="text-right">
                    Distance (km)
                  </label>
                  <Input
                    id="distance"
                    type="number"
                    className="col-span-3"
                    value={newRoute.distance}
                    onChange={(e) => setNewRoute({ 
                      ...newRoute, 
                      distance: parseInt(e.target.value) || 0 
                    })}
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
                    value={newRoute.price}
                    onChange={(e) => setNewRoute({ 
                      ...newRoute, 
                      price: parseInt(e.target.value) || 0 
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
                    value={newRoute.status}
                    onChange={(e) => setNewRoute({ 
                      ...newRoute, 
                      status: e.target.value as RouteData["status"]
                    })}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={handleSaveRoute}>
                  {editingRoute ? "Save Changes" : "Add Route"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <div className="p-4">
            <Input 
              placeholder="Search routes..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Distance (km)</TableHead>
                <TableHead>Price (XAF)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.from}</TableCell>
                  <TableCell>{route.to}</TableCell>
                  <TableCell>{route.distance} km</TableCell>
                  <TableCell>{route.price.toLocaleString()} XAF</TableCell>
                  <TableCell>{getStatusBadge(route.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRoute(route)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteRoute(route.id)}
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

export default AdminRoutes;
