
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthContainerProps {
  title: string;
  description: string;
  children: ReactNode;
}

const AuthContainer = ({ title, description, children }: AuthContainerProps) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-lg border-t-4 border-t-primary">
      <CardHeader className="relative">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        
        <div className="absolute top-6 right-6 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={() => navigate("/user")}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">User Dashboard</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={() => navigate("/admin/login")}
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthContainer;
