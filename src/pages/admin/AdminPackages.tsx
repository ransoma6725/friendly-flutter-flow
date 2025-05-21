
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
import { Package, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";

interface PackageData {
  id: string;
  trackingId: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: number;
  status: "pending" | "in-transit" | "delivered";
  price: number;
}

const initialPackages: PackageData[] = [
  {
    id: "1",
    trackingId: "PKG-001-2025",
    sender: "Ebai John",
    recipient: "Atanga Mary",
    origin: "Douala",
    destination: "Yaoundé",
    weight: 5.2,
    status: "in-transit",
    price: 3500
  },
  {
    id: "2",
    trackingId: "PKG-002-2025",
    sender: "Tambe Peter",
    recipient: "Bih Sarah",
    origin: "Bamenda",
    destination: "Buea",
    weight: 3.0,
    status: "pending",
    price: 2800
  },
  {
    id: "3",
    trackingId: "PKG-003-2025",
    sender: "Ashu Vincent",
    recipient: "Ngwa Ernest",
    origin: "Yaoundé",
    destination: "Douala",
    weight: 8.5,
    status: "delivered",
    price: 4200
  }
];

const AdminPackages = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<PackageData[]>(initialPackages);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = packages.filter(pkg => 
    pkg.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: PackageData["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-500">In Transit</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, status: PackageData["status"]) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, status } : pkg
    ));
    
    toast({
      title: "Status updated",
      description: `Package ${id} status changed to ${status}.`,
    });
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
            <p className="text-muted-foreground">Manage parcel shipments and tracking</p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Package
          </Button>
        </div>
        
        <Card>
          <div className="p-4">
            <Input 
              placeholder="Search packages by tracking ID, sender, recipient..." 
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.trackingId}</TableCell>
                  <TableCell>{pkg.sender}</TableCell>
                  <TableCell>{pkg.recipient}</TableCell>
                  <TableCell>{pkg.origin} → {pkg.destination}</TableCell>
                  <TableCell>{pkg.weight} kg</TableCell>
                  <TableCell>{pkg.price.toLocaleString()} XAF</TableCell>
                  <TableCell>
                    <select
                      className="p-1 text-xs border rounded"
                      value={pkg.status}
                      onChange={(e) => handleUpdateStatus(pkg.id, e.target.value as PackageData["status"])}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPackages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Package className="h-8 w-8 mb-2" />
                      <p>No packages found</p>
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

export default AdminPackages;
