
-- Add RLS policies for admin_users table to allow insertions
CREATE POLICY "Allow admin registration" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (true);

-- Allow reading admin credentials for login verification
CREATE POLICY "Allow admin login verification" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);
