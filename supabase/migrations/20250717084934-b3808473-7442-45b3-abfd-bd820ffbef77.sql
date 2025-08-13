-- First create some auth users and then reference them in our users table
-- Since we can't directly insert into auth.users, we'll use existing pattern

-- Populate buses table with sample data
INSERT INTO buses (name, from_location, to_location, departure_time, arrival_time, price, total_seats, available_seats) VALUES
('AVENIR Express', 'Douala', 'Yaoundé', '2025-01-20 07:30:00+01', '2025-01-20 10:45:00+01', 10000, 40, 35),
('VATICAN Voyager', 'Yaoundé', 'Bamenda', '2025-01-20 09:00:00+01', '2025-01-20 15:30:00+01', 15000, 45, 40),
('NSO BOYS Express', 'Douala', 'Limbe', '2025-01-20 12:15:00+01', '2025-01-20 13:45:00+01', 3000, 30, 28),
('MUSANGO Transport', 'Bamenda', 'Buea', '2025-01-20 06:00:00+01', '2025-01-20 12:30:00+01', 18000, 35, 30),
('Garanti Express', 'Douala', 'Bafoussam', '2025-01-20 08:45:00+01', '2025-01-20 13:20:00+01', 12000, 40, 38),
('Cardinal Express', 'Yaoundé', 'Ngaoundéré', '2025-01-20 14:00:00+01', '2025-01-20 20:30:00+01', 25000, 50, 45),
('Touristique Express', 'Buea', 'Douala', '2025-01-20 16:30:00+01', '2025-01-20 18:00:00+01', 4000, 25, 22);

-- Create seats for each bus
DO $$
DECLARE
    bus_record RECORD;
    seat_num TEXT;
    i INTEGER;
BEGIN
    FOR bus_record IN SELECT id, total_seats FROM buses LOOP
        FOR i IN 1..bus_record.total_seats LOOP
            seat_num := CHR(65 + ((i-1) / 4)) || ((i-1) % 4 + 1)::TEXT;
            INSERT INTO seats (bus_id, number, is_booked) 
            VALUES (bus_record.id, seat_num, CASE WHEN random() < 0.2 THEN true ELSE false END);
        END LOOP;
    END LOOP;
END $$;