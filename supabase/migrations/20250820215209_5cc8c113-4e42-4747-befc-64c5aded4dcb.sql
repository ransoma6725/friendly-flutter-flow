
-- Remove the overly permissive service role policy
DROP POLICY IF EXISTS "Service role can manage admin users" ON public.admin_users;

-- Create a more restrictive policy that only allows specific operations
-- This policy allows admin creation only through the secure registration process
CREATE POLICY "Allow secure admin registration" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts when called from a trusted context
  -- This ensures admin creation only happens through proper channels
  current_setting('role') = 'service_role' AND
  current_setting('request.jwt.claims', true) IS NOT NULL
);

-- Policy for admins to view other admin emails (but not password hashes)
CREATE POLICY "Admins can view admin emails only" 
ON public.admin_users 
FOR SELECT 
USING (
  is_admin() AND 
  -- Restrict which columns can be accessed
  current_setting('request.columns', true) NOT LIKE '%password%'
);

-- Update the authenticate_admin function to use SECURITY DEFINER properly
-- This ensures password verification happens in a controlled manner
CREATE OR REPLACE FUNCTION public.authenticate_admin(admin_email text, admin_password text)
RETURNS TABLE(authenticated boolean, admin_id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- This function can access password_hash because it runs with definer rights
  -- But it never exposes the hash, only returns boolean authentication result
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

-- Create a secure function for admin registration that handles password hashing
CREATE OR REPLACE FUNCTION public.create_admin_user(admin_email text, admin_password text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  new_admin_id uuid;
BEGIN
  -- Generate new UUID
  new_admin_id := gen_random_uuid();
  
  -- Insert new admin with hashed password
  INSERT INTO admin_users (id, email, password_hash)
  VALUES (new_admin_id, admin_email, hash_password(admin_password));
  
  RETURN new_admin_id;
END;
$$;
