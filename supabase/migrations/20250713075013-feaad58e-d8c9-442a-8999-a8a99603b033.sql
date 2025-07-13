
-- Insert the specific admin user credentials
INSERT INTO public.admin_users (id, email, password)
VALUES (
  gen_random_uuid(),
  'admin@cambus.com',
  'admin pass'
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password;
