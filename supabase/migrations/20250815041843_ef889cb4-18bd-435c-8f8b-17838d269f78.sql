-- Fix critical security vulnerability in buses table RLS policies
-- Replace overly permissive policies with proper admin-only restrictions

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Only admins can modify buses" ON public.buses;
DROP POLICY IF EXISTS "Only_admins_can_modify_buses" ON public.buses;

-- Create secure admin-only policies for bus modifications
CREATE POLICY "Only admins can update buses" 
ON public.buses 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete buses" 
ON public.buses 
FOR DELETE 
USING (is_admin());

-- Add missing INSERT policy for admins only
CREATE POLICY "Only admins can insert buses" 
ON public.buses 
FOR INSERT 
WITH CHECK (is_admin());