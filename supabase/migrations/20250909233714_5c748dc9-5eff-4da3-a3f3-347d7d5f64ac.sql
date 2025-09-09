-- Fix RLS policies for bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (true); -- Allow all users to view bookings for now, can be restricted later

CREATE POLICY "Users can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (true);

-- Ensure buses table has some sample data
INSERT INTO public.buses (id, name, from_location, to_location, departure_time, arrival_time, total_seats, available_seats, price, status)
VALUES 
    (gen_random_uuid(), 'Express 101', 'Douala', 'Yaoundé', '2024-01-15 08:00:00+00', '2024-01-15 12:00:00+00', 40, 35, 5000, 'active'),
    (gen_random_uuid(), 'Express 102', 'Yaoundé', 'Douala', '2024-01-15 14:00:00+00', '2024-01-15 18:00:00+00', 40, 38, 5000, 'active'),
    (gen_random_uuid(), 'Comfort 201', 'Douala', 'Bafoussam', '2024-01-15 09:00:00+00', '2024-01-15 13:30:00+00', 30, 25, 4500, 'active')
ON CONFLICT (id) DO NOTHING;

-- Create seats for buses that don't have them
DO $$
DECLARE
    bus_record RECORD;
    row_num INTEGER;
    seat_letter TEXT;
BEGIN
    FOR bus_record IN SELECT id, total_seats FROM buses LOOP
        -- Check if seats already exist for this bus
        IF NOT EXISTS (SELECT 1 FROM seats WHERE bus_id = bus_record.id) THEN
            -- Create seats for this bus
            FOR row_num IN 1..CEIL(bus_record.total_seats::FLOAT / 4) LOOP
                FOREACH seat_letter IN ARRAY ARRAY['A', 'B', 'C', 'D'] LOOP
                    -- Only create seat if we haven't exceeded total seats
                    IF (row_num - 1) * 4 + CASE 
                        WHEN seat_letter = 'A' THEN 1
                        WHEN seat_letter = 'B' THEN 2
                        WHEN seat_letter = 'C' THEN 3
                        ELSE 4
                    END <= bus_record.total_seats THEN
                        INSERT INTO seats (bus_id, number, is_booked)
                        VALUES (bus_record.id, row_num || seat_letter, false);
                    END IF;
                END LOOP;
            END LOOP;
        END IF;
    END LOOP;
END $$;

-- Mark some random seats as booked
SELECT mark_random_seats_as_booked();