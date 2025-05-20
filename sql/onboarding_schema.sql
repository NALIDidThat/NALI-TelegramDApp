-- NALI Onboarding Schema
-- This file defines all onboarding-related tables, policies, and triggers

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for user roles
CREATE TYPE IF NOT EXISTS user_role AS ENUM ('student', 'teacher', 'parent', 'hub_manager');

-- PROFILES TABLE: Tracks user identity and onboarding status
CREATE TABLE IF NOT EXISTS public.profiles (
    id BIGINT PRIMARY KEY,
    full_name TEXT NOT NULL,
    username TEXT,
    photo_url TEXT,
    role user_role,
    school_id UUID,
    class_id UUID,
    onboarding_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ONBOARDING PROGRESS TABLE: Tracks step-by-step onboarding for each user
CREATE TABLE IF NOT EXISTS public.onboarding_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id BIGINT REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_step TEXT NOT NULL, -- e.g. 'welcome', 'intro', 'school', etc.
    is_completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS: Only allow users to see and update their own onboarding progress
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can view their own onboarding progress"
    ON public.onboarding_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert onboarding progress for themselves"
    ON public.onboarding_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress"
    ON public.onboarding_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at_onboarding_progress
    BEFORE UPDATE ON public.onboarding_progress
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_onboarding_progress_user_id ON public.onboarding_progress(user_id); 