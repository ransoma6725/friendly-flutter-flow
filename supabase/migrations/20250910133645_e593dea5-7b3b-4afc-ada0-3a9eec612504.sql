-- Fix critical security vulnerability: Users can see all bookings
-- Replace the overly permissive policy with a secure one

-- First, drop the insecure policy that allows users to view all bookings
DROP POLICY IF EXISTS "Users can view all bookings" ON public.bookings;

-- Create a secure policy that only allows users to view their own bookings
CREATE POLICY "Users can view own bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Also fix the overly permissive update policy
DROP POLICY IF EXISTS "Users can update bookings" ON public.bookings;

-- Create a secure update policy that only allows users to update their own bookings
CREATE POLICY "Users can update own bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid());

-- Ensure the insert policy is properly restrictive
DROP POLICY IF EXISTS "Users can create their bookings" ON public.bookings;

-- Create a secure insert policy that ensures user_id matches the authenticated user
CREATE POLICY "Users can create own bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());