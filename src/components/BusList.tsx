
import { Bus } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bus as BusIcon } from "lucide-react";

interface BusListProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
}

const BusList = ({ buses, onSelectBus }: BusListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <BusIcon className="h-5 w-5 text-primary" />
          <span>Available Buses</span>
        </h3>
        
        <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
          {buses.length} Routes
        </Badge>
      </div>
      
      <div className="grid gap-4">
        {buses.map((bus) => (
          <div 
            key={bus.id} 
            className="bg-card rounded-lg border border-border p-4 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{bus.name}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{bus.from} → {bus.to}</span>
                </div>
              </div>
              <Badge 
                variant={bus.availableSeats > 10 ? "default" : "destructive"} 
                className="ml-2"
              >
                {bus.availableSeats} seats left
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Departure</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">{bus.departureTime}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Arrival</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span className="font-medium">{bus.arrivalTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <p className="font-bold text-lg">{bus.price.toLocaleString()} XAF</p>
                </div>
                
                <Button
                  onClick={() => onSelectBus(bus)}
                  disabled={bus.availableSeats === 0}
                  className="whitespace-nowrap"
                >
                  Select Bus
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
