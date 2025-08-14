
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface SystemCheck {
  name: string;
  status: "success" | "warning" | "error";
  message: string;
}

const SystemStatus = () => {
  const [checks, setChecks] = useState<SystemCheck[]>([]);

  useEffect(() => {
    const runSystemChecks = () => {
      const systemChecks: SystemCheck[] = [];

      // Check localStorage availability
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        systemChecks.push({
          name: "Local Storage",
          status: "success",
          message: "Available and functional"
        });
      } catch (e) {
        systemChecks.push({
          name: "Local Storage",
          status: "error",
          message: "Not available - bookings may not persist"
        });
      }

      // Check authentication system
      try {
        const authData = localStorage.getItem("cambus_user_auth");
        systemChecks.push({
          name: "Authentication",
          status: "success",
          message: authData ? "User session active" : "System ready for login"
        });
      } catch (e) {
        systemChecks.push({
          name: "Authentication",
          status: "warning",
          message: "Authentication system may have issues"
        });
      }

      // Check booking system
      try {
        const bookings = localStorage.getItem("cambus_bookings");
        systemChecks.push({
          name: "Booking System",
          status: "success",
          message: bookings ? `${JSON.parse(bookings).length} bookings found` : "System ready"
        });
      } catch (e) {
        systemChecks.push({
          name: "Booking System",
          status: "warning",
          message: "May have issues loading booking data"
        });
      }

      setChecks(systemChecks);
    };

    runSystemChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error": return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const hasErrors = checks.some(check => check.status === "error");
  const hasWarnings = checks.some(check => check.status === "warning");

  if (checks.length === 0) return null;

  return (
    <div className="mb-4">
      {(hasErrors || hasWarnings) && (
        <Alert variant={hasErrors ? "destructive" : "default"}>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium">
                {hasErrors ? "System Issues Detected" : "System Warnings"}
              </p>
              {checks
                .filter(check => check.status !== "success")
                .map(check => (
                  <div key={check.name} className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <span className="text-sm">
                      <strong>{check.name}:</strong> {check.message}
                    </span>
                  </div>
                ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SystemStatus;
