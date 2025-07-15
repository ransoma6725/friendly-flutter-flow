
-- Delete any existing admin user with this email first
DELETE FROM public.admin_users WHERE email = 'admin@cambus.com';

-- Insert new admin credentials that will work
INSERT INTO public.admin_users (id, email, password)
VALUES (
  gen_random_uuid(),
  'admin@cambus.com',
  'admin123'
);

-- Let's also add a backup admin user with different credentials
INSERT INTO public.admin_users (id, email, password)
VALUES (
  gen_random_uuid(),
  'superadmin@cambus.com',
  'superadmin123'
);

-- Verify the data was inserted correctly
SELECT email, password FROM public.admin_users;
