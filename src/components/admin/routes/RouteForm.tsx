
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface RouteData {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: "active" | "suspended";
}

interface RouteFormProps {
  newRoute: Partial<RouteData>;
  setNewRoute: React.Dispatch<React.SetStateAction<Partial<RouteData>>>;
  handleSaveRoute: () => void;
  editingRoute: RouteData | null;
}

const RouteForm = ({ newRoute, setNewRoute, handleSaveRoute, editingRoute }: RouteFormProps) => {
  return (
    <>
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
    </>
  );
};

export default RouteForm;
