
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
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
              
              {/* Admin Routes - only accessible when authenticated as admin */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

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
