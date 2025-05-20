-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile." ON profiles;
DROP POLICY IF EXISTS "Schools are viewable by everyone." ON schools;
DROP POLICY IF EXISTS "Classes are viewable by everyone." ON classes;
DROP POLICY IF EXISTS "Learning centers are viewable by everyone." ON learning_centers;
DROP POLICY IF EXISTS "Hub managers can manage their centers" ON learning_centers;

-- PROFILES table policies
-- Allow users to view public profiles
CREATE POLICY "Profiles are viewable by authenticated users." ON profiles
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile." ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile." ON profiles
    FOR DELETE USING (auth.uid() = id);

-- SCHOOLS table policies
-- Allow viewing schools
CREATE POLICY "Schools are viewable by authenticated users." ON schools
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow teachers to create schools
CREATE POLICY "Teachers can create schools." ON schools
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'teacher'
    ));

-- Allow teachers to update their school
CREATE POLICY "Teachers can update their school." ON schools
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
            AND profiles.school_id = schools.id
        )
    );

-- CLASSES table policies
-- Allow viewing classes
CREATE POLICY "Classes are viewable by authenticated users." ON classes
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow teachers to create classes in their school
CREATE POLICY "Teachers can create classes." ON classes
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
            AND profiles.school_id = classes.school_id
        )
    );

-- Allow teachers to update their classes
CREATE POLICY "Teachers can update their classes." ON classes
    FOR UPDATE USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
            AND profiles.school_id = classes.school_id
        )
    );

-- Allow teachers to delete their classes
CREATE POLICY "Teachers can delete their classes." ON classes
    FOR DELETE USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
            AND profiles.school_id = classes.school_id
        )
    );

-- LEARNING_CENTERS table policies
-- Allow viewing learning centers
CREATE POLICY "Learning centers are viewable by authenticated users." ON learning_centers
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow hub managers to create learning centers
CREATE POLICY "Hub managers can create learning centers." ON learning_centers
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'hub_manager'
        )
    );

-- Allow hub managers to update their centers
CREATE POLICY "Hub managers can update their centers." ON learning_centers
    FOR UPDATE USING (
        manager_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'hub_manager'
        )
    );

-- Allow hub managers to delete their centers
CREATE POLICY "Hub managers can delete their centers." ON learning_centers
    FOR DELETE USING (
        manager_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'hub_manager'
        )
    );

-- STUDENT_PARENTS table policies
-- Allow viewing student-parent relationships
CREATE POLICY "Student-parent relationships are viewable by involved parties." ON student_parents
    FOR SELECT USING (
        auth.uid() = student_id OR
        auth.uid() = parent_id OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('teacher', 'hub_manager')
        )
    );

-- Allow students and parents to create relationships
CREATE POLICY "Users can create student-parent relationships." ON student_parents
    FOR INSERT
    WITH CHECK (
        auth.uid() = student_id OR
        auth.uid() = parent_id
    );

-- Allow students and parents to update their relationships
CREATE POLICY "Users can update their student-parent relationships." ON student_parents
    FOR UPDATE USING (
        auth.uid() = student_id OR
        auth.uid() = parent_id
    );

-- Allow students and parents to delete their relationships
CREATE POLICY "Users can delete their student-parent relationships." ON student_parents
    FOR DELETE USING (
        auth.uid() = student_id OR
        auth.uid() = parent_id
    ); 