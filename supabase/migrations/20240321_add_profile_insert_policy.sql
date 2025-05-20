-- Add policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Add policy to allow users to delete their own profile
CREATE POLICY "Users can delete their own profile." ON profiles
    FOR DELETE 
    USING (auth.uid() = id); 