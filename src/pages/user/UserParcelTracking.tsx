
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { userSidebarItems } from "@/constants/sidebarItems";
import { Badge } from "@/components/ui/badge";

interface ParcelData {
  id: string;
  trackingId: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  date: string;
  weight: number;
  status: "pending" | "in-transit" | "delivered";
  locations: {
    location: string;
    timestamp: string;
    status: string;
  }[];
}

const parcelsData: ParcelData[] = [
  {
    id: "1",
    trackingId: "PKG-123-XYZ",
    sender: "John Doe",
    recipient: "Mary Smith",
    origin: "Douala",
    destination: "Yaoundé",
    date: "2025-05-15",
    weight: 3.5,
    status: "delivered",
    locations: [
      {
        location: "Douala Terminal",
        timestamp: "2025-05-15 08:45",
        status: "Package received"
      },
      {
        location: "Douala Sortation Center",
        timestamp: "2025-05-15 10:30",
        status: "In transit"
      },
      {
        location: "Edéa Checkpoint",
        timestamp: "2025-05-15 12:15",
        status: "In transit"
      },
      {
        location: "Yaoundé Terminal",
        timestamp: "2025-05-15 15:40",
        status: "Delivered"
      }
    ]
  },
  {
    id: "2",
    trackingId: "PKG-456-ABC",
    sender: "John Doe",
    recipient: "Peter Johnson",
    origin: "Bamenda",
    destination: "Buea",
    date: "2025-05-19",
    weight: 2.2,
    status: "in-transit",
    locations: [
      {
        location: "Bamenda Terminal",
        timestamp: "2025-05-19 07:30",
        status: "Package received"
      },
      {
        location: "Bamenda Sortation Center",
        timestamp: "2025-05-19 09:15",
        status: "In transit"
      },
      {
        location: "Bafoussam Checkpoint",
        timestamp: "2025-05-19 13:00",
        status: "In transit"
      }
    ]
  },
  {
    id: "3",
    trackingId: "PKG-789-DEF",
    sender: "John Doe",
    recipient: "Sarah Williams",
    origin: "Douala",
    destination: "Limbe",
    date: "2025-05-20",
    weight: 1.8,
    status: "pending",
    locations: [
      {
        location: "Douala Terminal",
        timestamp: "2025-05-20 14:20",
        status: "Package received"
      }
    ]
  }
];

const UserParcelTracking = () => {
  const [parcels] = useState<ParcelData[]>(parcelsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParcel, setSelectedParcel] = useState<ParcelData | null>(null);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    const found = parcels.find(p => 
      p.trackingId.toLowerCase() === searchTerm.toLowerCase()
    );
    
    setSelectedParcel(found || null);
  };

  const handleSelectParcel = (parcel: ParcelData) => {
    setSelectedParcel(parcel);
    setSearchTerm(parcel.trackingId);
  };

  const getStatusBadge = (status: ParcelData["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Pending</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-500">In Transit</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
    }
  };

  return (
    <DashboardLayout sidebarItems={userSidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parcel Tracking</h1>
          <p className="text-muted-foreground">Track your package shipments</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Track Your Parcel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 max-w-md mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter tracking number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Track</Button>
            </div>
            
            {selectedParcel ? (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Tracking ID</div>
                    <div className="font-medium">{selectedParcel.trackingId}</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">{getStatusBadge(selectedParcel.status)}</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Route</div>
                    <div className="font-medium">{selectedParcel.origin} → {selectedParcel.destination}</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Weight</div>
                    <div className="font-medium">{selectedParcel.weight} kg</div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Tracking Timeline</h3>
                  <div className="space-y-6">
                    {selectedParcel.locations.map((loc, idx) => (
                      <div key={idx} className="relative pl-8">
                        {idx < selectedParcel.locations.length - 1 && (
                          <div className="absolute left-[11px] top-[18px] bottom-0 w-0.5 bg-muted-foreground/30" />
                        )}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`absolute left-0 top-0.5 w-5 h-5 rounded-full ${
                            idx === 0 ? 'bg-blue-500' : 
                            idx === selectedParcel.locations.length - 1 && selectedParcel.status === 'delivered' 
                              ? 'bg-green-500' 
                              : 'bg-muted-foreground/50'
                          } flex items-center justify-center`}>
                            {idx === 0 ? (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            ) : idx === selectedParcel.locations.length - 1 && selectedParcel.status === 'delivered' ? (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            ) : null}
                          </div>
                          <span className="font-medium">{loc.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {loc.timestamp} - {loc.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium mb-4">Your Recent Parcels</h3>
                <div className="space-y-3">
                  {parcels.map((parcel) => (
                    <div 
                      key={parcel.id} 
                      className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSelectParcel(parcel)}
                    >
                      <div>
                        <div className="font-medium">{parcel.trackingId}</div>
                        <div className="text-sm text-muted-foreground">
                          {parcel.origin} → {parcel.destination} · {parcel.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(parcel.status)}
                        <Button variant="ghost" size="sm">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                  {parcels.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
                      <Package className="h-10 w-10 mb-2" />
                      <p>No recent parcels</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserParcelTracking;
