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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Search, MapPin, User, Phone, Weight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";

interface PackageData {
  id: string;
  trackingId: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  origin: string;
  destination: string;
  weight: number;
  description: string;
  price: number;
  status: "pending" | "in-transit" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

const AdminPackages = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [newPackage, setNewPackage] = useState<Partial<PackageData>>({
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    origin: "",
    destination: "",
    weight: 0,
    description: "",
    price: 0,
    status: "pending"
  });

  useEffect(() => {
    const samplePackages: PackageData[] = [
      {
        id: "1",
        trackingId: "PKG-001-2024",
        senderName: "Marie Nguema",
        senderPhone: "+237 679 123 456",
        recipientName: "Paul Manga",
        recipientPhone: "+237 695 789 012",
        origin: "Yaoundé",
        destination: "Douala",
        weight: 2.5,
        description: "Electronics - Laptop",
        price: 15000,
        status: "in-transit",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T14:20:00Z"
      }
    ];
    setPackages(samplePackages);
  }, []);

  const generateTrackingId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const year = new Date().getFullYear();
    return `PKG-${timestamp}-${year}`;
  };

  const handleSavePackage = () => {
    if (!newPackage.senderName || !newPackage.recipientName) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const packageData = { ...newPackage, price: newPackage.price || 0 } as PackageData;

    if (editingPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...pkg, ...packageData, updatedAt: new Date().toISOString() }
          : pkg
      ));
      toast({
        title: "Package updated",
        description: `Package ${editingPackage.trackingId} has been updated.`,
      });
    } else {
      const newPkg: PackageData = {
        ...packageData,
        id: Date.now().toString(),
        trackingId: generateTrackingId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPackages([newPkg, ...packages]);
      toast({
        title: "Package created",
        description: `Package ${newPkg.trackingId} has been created.`,
      });
    }
    
    setDialogOpen(false);
    setNewPackage({
      senderName: "",
      senderPhone: "",
      recipientName: "",
      recipientPhone: "",
      origin: "",
      destination: "",
      weight: 0,
      description: "",
      price: 0,
      status: "pending"
    });
    setEditingPackage(null);
  };

  const getStatusBadge = (status: PackageData["status"]) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      "in-transit": { color: "bg-blue-100 text-blue-800", label: "In Transit" },
      delivered: { color: "bg-green-100 text-green-800", label: "Delivered" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
            <p className="text-muted-foreground">Manage package deliveries and tracking</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Package</DialogTitle>
                <DialogDescription>Enter package details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Sender Name"
                  value={newPackage.senderName}
                  onChange={(e) => setNewPackage({ ...newPackage, senderName: e.target.value })}
                />
                <Input
                  placeholder="Recipient Name"
                  value={newPackage.recipientName}
                  onChange={(e) => setNewPackage({ ...newPackage, recipientName: e.target.value })}
                />
                <Input
                  placeholder="Origin"
                  value={newPackage.origin}
                  onChange={(e) => setNewPackage({ ...newPackage, origin: e.target.value })}
                />
                <Input
                  placeholder="Destination"
                  value={newPackage.destination}
                  onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                />
                <Input
                  placeholder="Price (XAF)"
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleSavePackage}>Add Package</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.trackingId}</TableCell>
                  <TableCell>{pkg.senderName}</TableCell>
                  <TableCell>{pkg.recipientName}</TableCell>
                  <TableCell>{pkg.origin} → {pkg.destination}</TableCell>
                  <TableCell>{pkg.price.toLocaleString()} XAF</TableCell>
                  <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPackages;