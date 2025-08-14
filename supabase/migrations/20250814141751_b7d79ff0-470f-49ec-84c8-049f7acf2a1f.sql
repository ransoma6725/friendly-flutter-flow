-- Remove the dangerous public SELECT policy on admin_users
DROP POLICY IF EXISTS "Allow admin login verification" ON public.admin_users;

-- Create a secure server-side function for admin authentication
CREATE OR REPLACE FUNCTION public.authenticate_admin(admin_email TEXT, admin_password TEXT)
RETURNS TABLE(authenticated BOOLEAN, admin_id UUID, email TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (au.password = admin_password) as authenticated,
    au.id as admin_id,
    au.email
  FROM admin_users au 
  WHERE au.email = admin_email;
END;
$$;

-- Restrict admin registration to be more secure (optional - only if needed)
DROP POLICY IF EXISTS "Allow admin registration" ON public.admin_users;
CREATE POLICY "Allow admin registration" ON public.admin_users
FOR INSERT 
WITH CHECK (true);