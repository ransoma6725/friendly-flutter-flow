
import { Bus, Route, Package, Clock, User, Calendar, MapPin, Ticket, Users, CreditCard } from "lucide-react";

export const adminSidebarItems = [
  {
    label: "Management",
    items: [
      { title: "Dashboard", path: "/admin", icon: User },
      { title: "Bookings", path: "/admin/bookings", icon: Ticket },
      { title: "Buses", path: "/admin/buses", icon: Bus },
      { title: "Routes", path: "/admin/routes", icon: Route },
      { title: "Packages", path: "/admin/packages", icon: Package },
      { title: "Schedules", path: "/admin/schedules", icon: Clock },
    ],
  },
];

export const userSidebarItems = [
  {
    label: "User Account",
    items: [
      { title: "Dashboard", path: "/user", icon: User },
      { title: "Booking History", path: "/user/bookings", icon: Calendar },
      { title: "Parcel Tracking", path: "/user/tracking", icon: MapPin },
    ],
  },
];
