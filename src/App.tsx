
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import { AdminProvider } from "./contexts/AdminContext";
import { BookingProvider } from "./contexts/BookingContext";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBuses = lazy(() => import("./pages/admin/AdminBuses"));
const AdminRoutes = lazy(() => import("./pages/admin/AdminRoutes"));
const AdminPackages = lazy(() => import("./pages/admin/AdminPackages"));
const AdminSchedules = lazy(() => import("./pages/admin/AdminSchedules"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserBookings = lazy(() => import("./pages/user/UserBookings"));
const UserParcelTracking = lazy(() => import("./pages/user/UserParcelTracking"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <AdminProvider>
          <BookingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<AboutUs />} />
                    
                    <Route path="/admin/login" element={<AdminLogin />} />
                    
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
                    
                    <Route path="/user" element={
                      <UserRoute>
                        <UserDashboard />
                      </UserRoute>
                    } />
                    <Route path="/user/bookings" element={
                      <UserRoute>
                        <UserBookings />
                      </UserRoute>
                    } />
                    <Route path="/user/tracking" element={
                      <UserRoute>
                        <UserParcelTracking />
                      </UserRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </BookingProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
