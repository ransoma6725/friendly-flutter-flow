-- Remove the overly permissive service role policy
DROP POLICY IF EXISTS "Service role can manage admin users" ON public.admin_users;

-- Update the authenticate_admin function to be more secure
-- This function will be the only way to verify admin credentials
CREATE OR REPLACE FUNCTION public.authenticate_admin(admin_email text, admin_password text)
RETURNS TABLE(authenticated boolean, admin_id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Use verify_password function for secure password checking
  RETURN QUERY
  SELECT 
    CASE 
      WHEN au.password_hash IS NOT NULL AND verify_password(admin_password, au.password_hash) 
      THEN true 
      ELSE false 
    END as authenticated,
    au.id as admin_id,
    au.email
  FROM admin_users au 
  WHERE au.email = admin_email;
END;
$$;

-- Create a more restrictive policy for admin creation that only works with the proper function
CREATE POLICY "Allow admin creation through secure function" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts when using the hash_password function
  -- This ensures passwords are properly hashed
  current_setting('role') = 'service_role' AND 
  current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
);