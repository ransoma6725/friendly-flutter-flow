import { useState, useEffect } from "react";
import { Bus } from "@/types";
import { BusService } from "@/services/busService";
import { useToast } from "@/hooks/use-toast";

export const useBusManagement = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      setIsLoading(true);
      const busesData = await BusService.getAllBuses();
      setBuses(busesData);
    } catch (error) {
      console.error('Error loading buses:', error);
      toast({
        title: "Error",
        description: "Failed to load buses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBusById = async (busId: string): Promise<Bus | null> => {
    try {
      return await BusService.getBusById(busId);
    } catch (error) {
      console.error('Error getting bus:', error);
      toast({
        title: "Error",
        description: "Failed to get bus information",
        variant: "destructive",
      });
      return null;
    }
  };

  const refreshBuses = () => {
    loadBuses();
  };

  return {
    buses,
    isLoading,
    loadBuses,
    getBusById,
    refreshBuses
  };
};