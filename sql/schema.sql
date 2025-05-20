-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type user_role as enum ('student', 'teacher', 'parent', 'hub_manager');
create type experience_difficulty as enum ('easy', 'medium', 'hard');
create type experience_status as enum ('pending', 'completed', 'verified');
create type reward_status as enum ('pending', 'claimed', 'delivered');

-- Create tables
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null,
    full_name text not null,
    role user_role not null,
    avatar_url text,
    phone_number text,
    school_id uuid,
    class_id uuid,
    local_hub_id uuid
);

create table if not exists public.schools (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    address text not null,
    city text not null,
    country text not null,
    phone_number text not null,
    email text not null
);

create table if not exists public.classes (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    school_id uuid references public.schools on delete cascade not null,
    teacher_id uuid references public.profiles on delete cascade not null,
    grade_level text not null
);

create table if not exists public.student_parents (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    student_id uuid references public.profiles on delete cascade not null,
    parent_id uuid references public.profiles on delete cascade not null,
    unique(student_id, parent_id)
);

create table if not exists public.experiences (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text not null,
    points integer not null,
    category text not null,
    difficulty experience_difficulty not null,
    requirements text[] not null,
    rewards text[] not null
);

create table if not exists public.student_experiences (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    student_id uuid references public.profiles on delete cascade not null,
    experience_id uuid references public.experiences on delete cascade not null,
    status experience_status not null default 'pending',
    completed_at timestamp with time zone,
    verified_by uuid references public.profiles on delete set null,
    notes text
);

create table if not exists public.rewards (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    description text not null,
    points_cost integer not null,
    image_url text,
    stock integer not null,
    category text not null
);

create table if not exists public.student_rewards (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    student_id uuid references public.profiles on delete cascade not null,
    reward_id uuid references public.rewards on delete cascade not null,
    status reward_status not null default 'pending',
    claimed_at timestamp with time zone,
    delivered_at timestamp with time zone
);

create table if not exists public.local_hubs (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    address text not null,
    city text not null,
    country text not null,
    phone_number text not null,
    email text not null,
    manager_id uuid references public.profiles on delete cascade not null,
    opening_hours text not null,
    capacity integer not null
);

-- Add foreign key constraints
alter table public.profiles
    add constraint profiles_school_id_fkey foreign key (school_id) references public.schools on delete set null,
    add constraint profiles_class_id_fkey foreign key (class_id) references public.classes on delete set null,
    add constraint profiles_local_hub_id_fkey foreign key (local_hub_id) references public.local_hubs on delete set null;

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.classes enable row level security;
alter table public.student_parents enable row level security;
alter table public.experiences enable row level security;
alter table public.student_experiences enable row level security;
alter table public.rewards enable row level security;
alter table public.student_rewards enable row level security;
alter table public.local_hubs enable row level security;

-- Create RLS Policies

-- Profiles policies
create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Schools policies
create policy "Anyone can view schools"
    on public.schools for select
    using (true);

create policy "Only hub managers can create schools"
    on public.schools for insert
    with check (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'hub_manager'
        )
    );

-- Classes policies
create policy "Anyone can view classes"
    on public.classes for select
    using (true);

create policy "Teachers can manage their own classes"
    on public.classes for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'teacher'
        )
    );

-- Student-Parent policies
create policy "Students and parents can view their relationships"
    on public.student_parents for select
    using (
        student_id = auth.uid() or parent_id = auth.uid()
    );

create policy "Teachers can view student-parent relationships in their classes"
    on public.student_parents for select
    using (
        exists (
            select 1 from public.profiles p
            join public.classes c on c.teacher_id = p.id
            where p.id = auth.uid() and p.role = 'teacher'
            and student_id in (
                select id from public.profiles
                where class_id = c.id
            )
        )
    );

-- Experiences policies
create policy "Anyone can view experiences"
    on public.experiences for select
    using (true);

create policy "Only teachers and hub managers can manage experiences"
    on public.experiences for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role in ('teacher', 'hub_manager')
        )
    );

-- Student Experiences policies
create policy "Students can view their own experiences"
    on public.student_experiences for select
    using (student_id = auth.uid());

create policy "Parents can view their children's experiences"
    on public.student_experiences for select
    using (
        exists (
            select 1 from public.student_parents
            where parent_id = auth.uid() and student_id = student_experiences.student_id
        )
    );

create policy "Teachers can view and manage experiences in their classes"
    on public.student_experiences for all
    using (
        exists (
            select 1 from public.profiles p
            join public.classes c on c.teacher_id = p.id
            where p.id = auth.uid() and p.role = 'teacher'
            and student_id in (
                select id from public.profiles
                where class_id = c.id
            )
        )
    );

-- Rewards policies
create policy "Anyone can view rewards"
    on public.rewards for select
    using (true);

create policy "Only hub managers can manage rewards"
    on public.rewards for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'hub_manager'
        )
    );

-- Student Rewards policies
create policy "Students can view their own rewards"
    on public.student_rewards for select
    using (student_id = auth.uid());

create policy "Parents can view their children's rewards"
    on public.student_rewards for select
    using (
        exists (
            select 1 from public.student_parents
            where parent_id = auth.uid() and student_id = student_rewards.student_id
        )
    );

create policy "Hub managers can manage all student rewards"
    on public.student_rewards for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'hub_manager'
        )
    );

-- Local Hubs policies
create policy "Anyone can view local hubs"
    on public.local_hubs for select
    using (true);

create policy "Hub managers can manage their own hubs"
    on public.local_hubs for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'hub_manager' and local_hub_id = local_hubs.id
        )
    );

-- Create indexes for better performance
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_school_id_idx on public.profiles(school_id);
create index if not exists profiles_class_id_idx on public.profiles(class_id);
create index if not exists student_experiences_student_id_idx on public.student_experiences(student_id);
create index if not exists student_experiences_experience_id_idx on public.student_experiences(experience_id);
create index if not exists student_rewards_student_id_idx on public.student_rewards(student_id);
create index if not exists student_rewards_reward_id_idx on public.student_rewards(reward_id);
create index if not exists student_parents_student_id_idx on public.student_parents(student_id);
create index if not exists student_parents_parent_id_idx on public.student_parents(parent_id); 