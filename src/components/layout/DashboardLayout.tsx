
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import DashboardNavbar from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: {
    label: string;
    items: {
      title: string;
      path: string;
      icon: React.ElementType;
    }[];
  }[];
  userName?: string;
  userRole?: string;
}

const DashboardLayout = ({ children, sidebarItems, userName, userRole }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="min-h-screen flex w-full flex-col">
        {/* Mobile navigation */}
        <Sheet>
          <DashboardNavbar>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SidebarTrigger className="hidden md:flex" />
          </DashboardNavbar>
          
          <SheetContent side="left" className="md:hidden p-0">
            <MobileSidebar sidebarItems={sidebarItems} />
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 w-full">
          {/* Desktop sidebar - hidden on mobile */}
          <DesktopSidebar sidebarItems={sidebarItems} />
          
          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const MobileSidebar = ({ sidebarItems }: { sidebarItems: DashboardLayoutProps['sidebarItems'] }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background p-4 h-full flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold">
          Cam<span className="text-primary">Bus</span>
        </h1>
      </div>
      
      {sidebarItems.map((group, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">{group.label}</h2>
          <nav className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
};

const DesktopSidebar = ({ sidebarItems }: { sidebarItems: DashboardLayoutProps['sidebarItems'] }) => {
  const navigate = useNavigate();
  
  return (
    <Sidebar className="hidden md:flex transition-all duration-300 border-r" collapsible>
      <div className="px-3 py-2">
        <h1 className="text-xl font-bold px-3 py-2">
          Cam<span className="text-primary">Bus</span>
        </h1>
      </div>
      
      <SidebarContent>
        {sidebarItems.map((group, index) => (
          <SidebarGroup key={index} defaultOpen>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardLayout;
