
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBuses from "./pages/admin/AdminBuses";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminSchedules from "./pages/admin/AdminSchedules";
import UserDashboard from "./pages/user/UserDashboard";
import UserBookings from "./pages/user/UserBookings";
import UserParcelTracking from "./pages/user/UserParcelTracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/buses" element={<AdminBuses />} />
            <Route path="/admin/routes" element={<AdminRoutes />} />
            <Route path="/admin/packages" element={<AdminPackages />} />
            <Route path="/admin/schedules" element={<AdminSchedules />} />
            
            {/* User Routes */}
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/bookings" element={<UserBookings />} />
            <Route path="/user/tracking" element={<UserParcelTracking />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
