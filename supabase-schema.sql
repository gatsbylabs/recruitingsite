-- Create the completion_times table in Supabase
CREATE TABLE IF NOT EXISTS completion_times (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_index INTEGER NOT NULL,
  completion_time INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index for faster queries
CREATE INDEX idx_completion_times_challenge ON completion_times(challenge_index);

-- Enable Row Level Security (RLS)
ALTER TABLE completion_times ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read completion times
CREATE POLICY "Allow public read access" ON completion_times
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert completion times
CREATE POLICY "Allow public insert access" ON completion_times
  FOR INSERT WITH CHECK (true);