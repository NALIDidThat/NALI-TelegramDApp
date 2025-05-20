-- Enable realtime for profiles table
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;

-- Ensure the table is set up for realtime
ALTER TABLE profiles REPLICA IDENTITY FULL; 