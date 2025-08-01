
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminRegister from "@/pages/admin/AdminRegister";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBuses from "@/pages/admin/AdminBuses";
import AdminRoutes from "@/pages/admin/AdminRoutes";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminPackages from "@/pages/admin/AdminPackages";
import AdminSchedules from "@/pages/admin/AdminSchedules";
import AdminRoute from "@/components/AdminRoute";
import UserRoute from "@/components/UserRoute";
import { AdminProvider } from "@/contexts/AdminContext";
import { BookingProvider } from "@/contexts/BookingContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminProvider>
          <BookingProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              
              {/* Admin Routes - only accessible when authenticated as admin */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              <Route path="/admin/buses" element={<AdminRoute><AdminBuses /></AdminRoute>} />
              <Route path="/admin/routes" element={<AdminRoute><AdminRoutes /></AdminRoute>} />
              <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
              <Route path="/admin/packages" element={<AdminRoute><AdminPackages /></AdminRoute>} />
              <Route path="/admin/schedules" element={<AdminRoute><AdminSchedules /></AdminRoute>} />

              {/* User Routes - only accessible when authenticated as user */}
              <Route path="/profile" element={<UserRoute><div>User Profile</div></UserRoute>} />
            </Routes>
          </BookingProvider>
        </AdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
