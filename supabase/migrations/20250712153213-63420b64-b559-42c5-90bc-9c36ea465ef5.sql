
-- First, let's create a test admin user in the auth system
-- Note: In a real scenario, you would sign up through the normal flow first
-- For this example, I'll create a sample admin entry

-- Insert an admin user into the admin_users table
-- You'll need to replace this email with an actual user account that exists in auth.users
INSERT INTO public.admin_users (id, email) 
VALUES (
  gen_random_uuid(), 
  'admin@cambus.com'
) ON CONFLICT (email) DO NOTHING;

-- If you want to add your own email as admin, replace 'admin@cambus.com' with your email
-- Make sure this email matches exactly with an account you've created through the signup process
