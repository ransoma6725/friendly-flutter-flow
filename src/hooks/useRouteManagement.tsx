
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useRouteManagement = () => {
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

  return {
    routes: filteredRoutes,
    searchTerm,
    setSearchTerm,
    dialogOpen,
    setDialogOpen,
    editingRoute,
    setEditingRoute,
    newRoute,
    setNewRoute,
    handleSaveRoute,
    handleEditRoute,
    handleDeleteRoute
  };
};
