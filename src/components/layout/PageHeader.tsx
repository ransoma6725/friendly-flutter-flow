
import { Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";

const PageHeader = () => {
  return (
    <Header>
      <Link to="/about">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">About Us</span>
        </Button>
      </Link>
      
      <Link to="/admin">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Admin Dashboard</span>
        </Button>
      </Link>
    </Header>
  );
};

export default PageHeader;
