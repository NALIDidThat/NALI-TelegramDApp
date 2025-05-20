-- Insert sample schools
insert into public.schools (name, address, city, country, phone_number, email)
values 
('Green Valley High School', '123 Education St', 'Springfield', 'USA', '+1-555-123-4567', 'info@greenvalley.edu'),
('Sunshine Elementary', '456 Learning Ave', 'Springfield', 'USA', '+1-555-234-5678', 'contact@sunshine.edu'),
('Tech Academy', '789 Innovation Blvd', 'Springfield', 'USA', '+1-555-345-6789', 'hello@techacademy.edu');

-- Insert sample local hubs
insert into public.local_hubs (name, address, city, country, phone_number, email, opening_hours, capacity)
values 
('Springfield Community Center', '321 Community Dr', 'Springfield', 'USA', '+1-555-456-7890', 'info@springfieldcc.org', 'Mon-Fri: 9am-9pm, Sat: 10am-6pm', 100),
('Youth Innovation Hub', '654 Creativity St', 'Springfield', 'USA', '+1-555-567-8901', 'contact@youthhub.org', 'Mon-Sat: 10am-8pm', 50);

-- Insert sample experiences
insert into public.experiences (title, description, points, category, difficulty, requirements, rewards)
values 
('Coding Basics', 'Learn the fundamentals of programming', 100, 'Technology', 'easy', 
  ARRAY['Complete online tutorial', 'Create simple program'], 
  ARRAY['Certificate of Completion', 'Digital Badge']),
('Environmental Project', 'Create a sustainable garden', 150, 'Science', 'medium', 
  ARRAY['Research local plants', 'Design garden layout', 'Plant and maintain garden'], 
  ARRAY['Eco Warrior Badge', 'Garden Kit']),
('Public Speaking', 'Develop presentation skills', 200, 'Communication', 'hard', 
  ARRAY['Research topic', 'Create presentation', 'Deliver to class'], 
  ARRAY['Public Speaking Certificate', 'Leadership Badge']);

-- Insert sample rewards
insert into public.rewards (name, description, points_cost, image_url, stock, category)
values 
('Gaming Console', 'Latest gaming console', 1000, 'https://example.com/gaming-console.jpg', 5, 'Electronics'),
('Book Collection', 'Set of educational books', 500, 'https://example.com/books.jpg', 10, 'Education'),
('Sports Equipment', 'Complete sports kit', 800, 'https://example.com/sports.jpg', 8, 'Sports'),
('Art Supplies', 'Professional art set', 300, 'https://example.com/art.jpg', 15, 'Arts'),
('Music Lessons', 'One month of music lessons', 600, 'https://example.com/music.jpg', 20, 'Music');

-- Note: Actual user profiles will be created through the authentication system
-- The following is just an example of how to link profiles once they exist

-- Example of linking a profile to a school and class (uncomment and modify when you have actual user IDs)
/*
insert into public.profiles (id, email, full_name, role, school_id, class_id)
values 
('user-uuid-here', 'student@example.com', 'John Doe', 'student', 
  (select id from public.schools where name = 'Green Valley High School'),
  (select id from public.classes where name = 'Grade 10A'));
*/

-- Example of creating a student-parent relationship (uncomment and modify when you have actual user IDs)
/*
insert into public.student_parents (student_id, parent_id)
values 
('student-uuid-here', 'parent-uuid-here');
*/

-- Example of creating a student experience (uncomment and modify when you have actual user IDs)
/*
insert into public.student_experiences (student_id, experience_id, status, completed_at)
values 
('student-uuid-here', 
  (select id from public.experiences where title = 'Coding Basics'),
  'completed',
  now());
*/

-- Example of creating a student reward (uncomment and modify when you have actual user IDs)
/*
insert into public.student_rewards (student_id, reward_id, status, claimed_at)
values 
('student-uuid-here',
  (select id from public.rewards where name = 'Book Collection'),
  'claimed',
  now());
*/ 