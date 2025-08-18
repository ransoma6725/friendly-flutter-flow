
-- Fix the is_seat_available function to have an immutable search path
CREATE OR REPLACE FUNCTION public.is_seat_available(seat_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.seats 
    WHERE id = seat_id AND is_booked = true
  );
END;
$$;

-- Fix the hash_password function to have an immutable search path
CREATE OR REPLACE FUNCTION public.hash_password(raw_password text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT crypt(raw_password, gen_salt('bf', 10));
$$;

-- Fix the verify_password function to have an immutable search path
CREATE OR REPLACE FUNCTION public.verify_password(raw_password text, stored_hash text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT stored_hash = crypt(raw_password, stored_hash);
$$;
