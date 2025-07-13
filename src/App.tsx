import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from "react-query";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminRoute from "@/components/AdminRoute";
import UserRoute from "@/components/UserRoute";
import { AdminProvider } from "@/contexts/AdminContext";

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <AdminProvider>
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
        </AdminProvider>
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;
