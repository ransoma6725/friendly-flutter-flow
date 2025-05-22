
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/constants/sidebarItems";
import RouteDialog from "@/components/admin/routes/RouteDialog";
import RouteTable from "@/components/admin/routes/RouteTable";
import SearchRoutes from "@/components/admin/routes/SearchRoutes";
import { useRouteManagement } from "@/hooks/useRouteManagement";

const AdminRoutes = () => {
  const {
    routes,
    searchTerm,
    setSearchTerm,
    dialogOpen,
    setDialogOpen,
    editingRoute,
    setEditingRoute,
    newRoute,
    setNewRoute,
    handleSaveRoute,
    handleEditRoute,
    handleDeleteRoute
  } = useRouteManagement();

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Routes</h1>
            <p className="text-muted-foreground">Manage bus routes and destinations</p>
          </div>
          
          <RouteDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            newRoute={newRoute}
            setNewRoute={setNewRoute}
            handleSaveRoute={handleSaveRoute}
            editingRoute={editingRoute}
            setEditingRoute={setEditingRoute}
          />
        </div>
        
        <Card>
          <SearchRoutes 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <RouteTable 
            routes={routes}
            handleEditRoute={handleEditRoute}
            handleDeleteRoute={handleDeleteRoute}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminRoutes;
