
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RouteForm from "./RouteForm";

interface RouteData {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: "active" | "suspended";
}

interface RouteDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  newRoute: Partial<RouteData>;
  setNewRoute: React.Dispatch<React.SetStateAction<Partial<RouteData>>>;
  handleSaveRoute: () => void;
  editingRoute: RouteData | null;
  setEditingRoute: React.Dispatch<React.SetStateAction<RouteData | null>>;
}

const RouteDialog = ({ 
  dialogOpen, 
  setDialogOpen, 
  newRoute, 
  setNewRoute, 
  handleSaveRoute, 
  editingRoute,
  setEditingRoute
}: RouteDialogProps) => {
  return (
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
        
        <RouteForm 
          newRoute={newRoute}
          setNewRoute={setNewRoute}
          handleSaveRoute={handleSaveRoute}
          editingRoute={editingRoute}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RouteDialog;
