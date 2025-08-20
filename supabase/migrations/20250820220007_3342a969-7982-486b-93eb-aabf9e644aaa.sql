
-- First, let's modify the existing bookings table to match the current booking structure
-- and add fields for admin confirmation/rejection

-- Add missing columns to the bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS user_name text,
ADD COLUMN IF NOT EXISTS user_email text,
ADD COLUMN IF NOT EXISTS bus_name text,
ADD COLUMN IF NOT EXISTS from_location text,
ADD COLUMN IF NOT EXISTS to_location text,
ADD COLUMN IF NOT EXISTS departure_time timestamp with time zone,
ADD COLUMN IF NOT EXISTS arrival_time timestamp with time zone,
ADD COLUMN IF NOT EXISTS seat_numbers text[],
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected'));

-- Update the existing payment_confirmed column to work with the new status system
-- We'll keep both for backward compatibility
ALTER TABLE public.bookings 
ALTER COLUMN payment_confirmed SET DEFAULT false;

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Update RLS policies to ensure admins can view all bookings and update status
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;

CREATE POLICY "Admins can update booking status" 
ON public.bookings 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

-- Allow admins to view all bookings for management
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (is_admin());
