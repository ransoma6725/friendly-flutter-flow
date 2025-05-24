
import { ReactNode } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface DashboardNavbarProps {
  children?: ReactNode;
  userName?: string;
  userRole?: string;
}

const DashboardNavbar = ({ children, userName, userRole }: DashboardNavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been logged out",
    });
    navigate("/");
  };

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          {children}
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {userName && (
            <div className="hidden md:flex flex-col text-right text-sm">
              <span className="font-medium">{userName}</span>
              {userRole && <span className="text-muted-foreground text-xs">{userRole}</span>}
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                size="icon"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => navigate("/")}>
                Book a Bus
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
