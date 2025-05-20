-- Drop existing profile policies
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile." ON profiles;

-- Temporarily disable role check constraint for initial signup
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role IS NULL OR role IN ('student', 'teacher', 'parent', 'hub_manager'));

-- Allow profile creation during signup
CREATE POLICY "Enable insert for authentication users only" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to view their own profile and profiles they need to interact with
CREATE POLICY "Users can view relevant profiles" ON profiles
    FOR SELECT USING (
        -- User can view their own profile
        auth.uid() = id
        OR 
        -- Teachers can view profiles in their school
        EXISTS (
            SELECT 1 FROM profiles teacher_profile
            WHERE teacher_profile.id = auth.uid()
            AND teacher_profile.role = 'teacher'
            AND teacher_profile.school_id = profiles.school_id
        )
        OR
        -- Parents can view their children's profiles
        EXISTS (
            SELECT 1 FROM student_parents
            WHERE (student_parents.parent_id = auth.uid() AND student_parents.student_id = profiles.id)
            OR (student_parents.student_id = auth.uid() AND student_parents.parent_id = profiles.id)
        )
        OR
        -- Hub managers can view profiles in their centers
        EXISTS (
            SELECT 1 FROM learning_centers
            WHERE learning_centers.manager_id = auth.uid()
            AND (
                -- Add conditions for profiles associated with the learning center
                -- This will need to be expanded based on your specific requirements
                profiles.id = learning_centers.manager_id
            )
        )
    );

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete own profile" ON profiles
    FOR DELETE USING (auth.uid() = id); 