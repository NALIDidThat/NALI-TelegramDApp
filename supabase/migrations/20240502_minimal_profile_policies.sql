-- Drop all existing policies on profiles
drop policy if exists "Users can view relevant profiles" on profiles;
drop policy if exists "Users can view their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can delete own profile" on profiles;
drop policy if exists "Enable insert for authentication users only" on profiles;
drop policy if exists "Profiles are viewable by authenticated users." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Public profiles are viewable by everyone." on profiles;

-- Minimal, safe policies for profiles
create policy "Enable insert for authentication users only" on profiles
    for insert with check (auth.uid() = id);

create policy "Users can view their own profile" on profiles
    for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
    for update using (auth.uid() = id);

create policy "Users can delete own profile" on profiles
    for delete using (auth.uid() = id); 