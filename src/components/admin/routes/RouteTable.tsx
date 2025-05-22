
import React from "react";
import { Pencil, Trash, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RouteData {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: "active" | "suspended";
}

interface RouteTableProps {
  routes: RouteData[];
  handleEditRoute: (route: RouteData) => void;
  handleDeleteRoute: (id: string) => void;
}

const RouteTable = ({ routes, handleEditRoute, handleDeleteRoute }: RouteTableProps) => {
  const getStatusBadge = (status: RouteData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="border-red-500 text-red-500">Suspended</Badge>;
    }
  };

  return (
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
        {routes.map((route) => (
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
  );
};

export default RouteTable;
