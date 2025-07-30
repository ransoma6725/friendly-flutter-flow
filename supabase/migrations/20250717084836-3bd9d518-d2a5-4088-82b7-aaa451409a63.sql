-- Populate buses table with sample data
INSERT INTO buses (name, from_location, to_location, departure_time, arrival_time, price, total_seats, available_seats) VALUES
('AVENIR Express', 'Douala', 'Yaoundé', '2025-01-20 07:30:00+01', '2025-01-20 10:45:00+01', 10000, 40, 35),
('VATICAN Voyager', 'Yaoundé', 'Bamenda', '2025-01-20 09:00:00+01', '2025-01-20 15:30:00+01', 15000, 45, 40),
('NSO BOYS Express', 'Douala', 'Limbe', '2025-01-20 12:15:00+01', '2025-01-20 13:45:00+01', 3000, 30, 28),
('MUSANGO Transport', 'Bamenda', 'Buea', '2025-01-20 06:00:00+01', '2025-01-20 12:30:00+01', 18000, 35, 30),
('Garanti Express', 'Douala', 'Bafoussam', '2025-01-20 08:45:00+01', '2025-01-20 13:20:00+01', 12000, 40, 38),
('Cardinal Express', 'Yaoundé', 'Ngaoundéré', '2025-01-20 14:00:00+01', '2025-01-20 20:30:00+01', 25000, 50, 45),
('Touristique Express', 'Buea', 'Douala', '2025-01-20 16:30:00+01', '2025-01-20 18:00:00+01', 4000, 25, 22);

-- Populate users table with sample data
INSERT INTO users (id, name, email, phone) VALUES
(gen_random_uuid(), 'Jean Baptiste Kamga', 'jean.kamga@gmail.com', '+237677123456'),
(gen_random_uuid(), 'Marie Claire Fotso', 'marie.fotso@yahoo.com', '+237680987654'),
(gen_random_uuid(), 'Paul Mbarga Ndjodo', 'paul.mbarga@outlook.com', '+237691234567'),
(gen_random_uuid(), 'Françoise Eyenga', 'francoise.eyenga@gmail.com', '+237698765432'),
(gen_random_uuid(), 'Samuel Tchounke', 'samuel.tchounke@hotmail.com', '+237685432109'),
(gen_random_uuid(), 'Béatrice Mengue', 'beatrice.mengue@gmail.com', '+237677890123'),
(gen_random_uuid(), 'Michel Ondobo', 'michel.ondobo@yahoo.fr', '+237692456789'),
(gen_random_uuid(), 'Rose Ateba Mbassi', 'rose.ateba@gmail.com', '+237683567890'),
(gen_random_uuid(), 'Albert Nguema', 'albert.nguema@outlook.com', '+237679123456'),
(gen_random_uuid(), 'Clarisse Njoya', 'clarisse.njoya@gmail.com', '+237688234567');

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

-- Create sample bookings
DO $$
DECLARE
    user_record RECORD;
    bus_record RECORD;
    seat_record RECORD;
    booking_id UUID;
    num_bookings INTEGER := 0;
BEGIN
    FOR user_record IN SELECT id FROM users ORDER BY random() LIMIT 8 LOOP
        FOR bus_record IN SELECT id, price FROM buses ORDER BY random() LIMIT (random() * 3 + 1)::INTEGER LOOP
            booking_id := gen_random_uuid();
            
            INSERT INTO bookings (id, user_id, bus_id, total_price, payment_confirmed, departure_date) 
            VALUES (
                booking_id, 
                user_record.id, 
                bus_record.id, 
                bus_record.price * (random() * 2 + 1)::INTEGER, 
                CASE WHEN random() < 0.8 THEN true ELSE false END,
                NOW() + (random() * 30 || ' days')::INTERVAL
            );
            
            -- Add 1-3 seats per booking
            FOR seat_record IN 
                SELECT id FROM seats 
                WHERE bus_id = bus_record.id AND is_booked = false 
                ORDER BY random() 
                LIMIT (random() * 2 + 1)::INTEGER 
            LOOP
                INSERT INTO booking_seats (booking_id, seat_id) 
                VALUES (booking_id, seat_record.id);
                
                UPDATE seats SET is_booked = true WHERE id = seat_record.id;
            END LOOP;
            
            num_bookings := num_bookings + 1;
            EXIT WHEN num_bookings >= 15;
        END LOOP;
        EXIT WHEN num_bookings >= 15;
    END LOOP;
END $$;