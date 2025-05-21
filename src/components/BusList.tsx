
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
import { MapPin, Clock, Bus as BusIcon, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusListProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
}

const BusList = ({ buses, onSelectBus }: BusListProps) => {
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>(buses);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  // Get unique locations from buses
  const locations = Array.from(
    new Set([...buses.map(bus => bus.from), ...buses.map(bus => bus.to)])
  ).sort();

  // Apply filters to buses
  const handleFilter = () => {
    let filtered = [...buses];
    
    if (from) {
      filtered = filtered.filter((bus) => bus.from.toLowerCase() === from.toLowerCase());
    }
    
    if (to) {
      filtered = filtered.filter((bus) => bus.to.toLowerCase() === to.toLowerCase());
    }
    
    setFilteredBuses(filtered);
  };

  const clearFilters = () => {
    setFrom("");
    setTo("");
    setFilteredBuses(buses);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <BusIcon className="h-5 w-5 text-primary" />
          <span>Available Buses</span>
        </h3>
        
        <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
          {filteredBuses.length} Routes
        </Badge>
      </div>

      <div className="p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filter Routes
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="from" className="text-sm text-muted-foreground">From</label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger>
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={`from-${location}`} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="to" className="text-sm text-muted-foreground">To</label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={`to-${location}`} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button onClick={handleFilter} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Search Buses
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
            <BusIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-medium">No buses found</h4>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusList;
