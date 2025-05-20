
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

interface BusListProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
}

const BusList = ({ buses, onSelectBus }: BusListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Buses</h3>
      
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell className="font-medium">{bus.name}</TableCell>
                <TableCell>{bus.from} → {bus.to}</TableCell>
                <TableCell>{bus.departureTime}</TableCell>
                <TableCell>${bus.price}</TableCell>
                <TableCell>{bus.availableSeats}/{bus.totalSeats}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => onSelectBus(bus)}
                    disabled={bus.availableSeats === 0}
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BusList;
