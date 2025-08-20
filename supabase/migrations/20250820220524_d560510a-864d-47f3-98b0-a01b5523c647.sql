
-- Create a function to automatically mark some random seats as booked for each bus
CREATE OR REPLACE FUNCTION mark_random_seats_as_booked()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    bus_record RECORD;
    seat_record RECORD;
    random_seat_count INTEGER;
BEGIN
    -- Loop through all buses
    FOR bus_record IN SELECT id, total_seats FROM buses LOOP
        -- Calculate random number of seats to book (10-30% of total seats)
        random_seat_count := FLOOR(RANDOM() * (bus_record.total_seats * 0.2) + (bus_record.total_seats * 0.1));
        
        -- Mark random seats as booked for this bus
        WITH random_seats AS (
            SELECT id 
            FROM seats 
            WHERE bus_id = bus_record.id 
            AND is_booked = false 
            ORDER BY RANDOM() 
            LIMIT random_seat_count
        )
        UPDATE seats 
        SET is_booked = true 
        WHERE id IN (SELECT id FROM random_seats);
    END LOOP;
END;
$$;

-- Create seats for all existing buses if they don't exist
INSERT INTO seats (bus_id, number, is_booked)
SELECT 
    b.id as bus_id,
    (row_num || seat_letter) as number,
    false as is_booked
FROM buses b
CROSS JOIN (
    SELECT generate_series(1, 10) as row_num
) rows
CROSS JOIN (
    SELECT unnest(ARRAY['A', 'B', 'C', 'D']) as seat_letter
) letters
WHERE NOT EXISTS (
    SELECT 1 FROM seats s WHERE s.bus_id = b.id
)
ORDER BY b.id, row_num, seat_letter;

-- Run the function to mark some seats as booked
SELECT mark_random_seats_as_booked();

-- Create a trigger function to prevent double booking
CREATE OR REPLACE FUNCTION prevent_double_booking()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the seat is already booked
    IF NEW.is_booked = true AND OLD.is_booked = true THEN
        RAISE EXCEPTION 'Seat is already booked and cannot be booked again';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger to prevent double booking
DROP TRIGGER IF EXISTS prevent_seat_double_booking ON seats;
CREATE TRIGGER prevent_seat_double_booking
    BEFORE UPDATE ON seats
    FOR EACH ROW
    EXECUTE FUNCTION prevent_double_booking();

-- Update RLS policies for seats to allow booking operations
DROP POLICY IF EXISTS "Users can update seat booking status" ON seats;
CREATE POLICY "Users can update seat booking status" 
ON seats 
FOR UPDATE 
USING (true)
WITH CHECK (true);
