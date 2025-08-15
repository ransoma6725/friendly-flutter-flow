-- Fix critical security vulnerability: Remove public admin registration
-- Replace with admin-only registration policy

-- Drop the dangerous public registration policy
DROP POLICY IF EXISTS "Allow admin registration" ON public.admin_users;

-- Create secure admin-only registration policy
-- Only existing authenticated admins can create new admin accounts
CREATE POLICY "Only admins can create new admins" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (is_admin());

-- Add policy for admins to view admin users (needed for admin management)
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (is_admin());

-- Add policy for admins to update admin users (for password changes, etc.)
CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (is_admin());