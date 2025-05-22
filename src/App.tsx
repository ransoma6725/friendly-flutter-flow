
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
import AdminBookings from "./pages/admin/AdminBookings";
import UserDashboard from "./pages/user/UserDashboard";
import UserBookings from "./pages/user/UserBookings";
import UserParcelTracking from "./pages/user/UserParcelTracking";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import { AdminProvider } from "./contexts/AdminContext";
import { BookingProvider } from "./contexts/BookingContext";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AdminProvider>
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                
                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/bookings" element={
                  <AdminRoute>
                    <AdminBookings />
                  </AdminRoute>
                } />
                <Route path="/admin/buses" element={
                  <AdminRoute>
                    <AdminBuses />
                  </AdminRoute>
                } />
                <Route path="/admin/routes" element={
                  <AdminRoute>
                    <AdminRoutes />
                  </AdminRoute>
                } />
                <Route path="/admin/packages" element={
                  <AdminRoute>
                    <AdminPackages />
                  </AdminRoute>
                } />
                <Route path="/admin/schedules" element={
                  <AdminRoute>
                    <AdminSchedules />
                  </AdminRoute>
                } />
                
                {/* User Routes */}
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/bookings" element={<UserBookings />} />
                <Route path="/user/tracking" element={<UserParcelTracking />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BookingProvider>
      </AdminProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
