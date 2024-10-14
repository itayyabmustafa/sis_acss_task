create database if not exists `sis`;
use sis;
-- Insert dummy data into students
INSERT INTO students (name, email, dob, programEnrolled) VALUES
('Alice Johnson', 'alice.johnson@example.com', '2001-01-15', 'Computer Science'),
('Bob Smith', 'bob.smith@example.com', '2002-02-20', 'Information Technology'),
('Carol Williams', 'carol.williams@example.com', '2003-03-30', 'Data Science'),
('David Brown', 'david.brown@example.com', '2004-04-10', 'Software Engineering'),
('Eve Davis', 'eve.davis@example.com', '2001-05-25', 'Cybersecurity');

-- Insert dummy data into courses
INSERT INTO courses (name, instructor, credits) VALUES
('Introduction to Programming', 'Tayyab', 4),
('Database Management Systems', 'Tayyab', 4),
('Web Development', 'Tayyab', 3),
('Data Structures and Algorithms', 'Tayyab', 4),
('Software Engineering', 'Tayyab', 3);

-- Insert dummy data into enrollments
INSERT INTO enrollments (studentId, courseId, enrollmentDate) VALUES
(1, 1, '2024-08-01 10:00:00'),
(1, 2, '2024-08-15 12:00:00'),
(2, 1, '2024-09-01 14:00:00'),
(2, 3, '2024-09-10 09:30:00'),
(3, 2, '2024-09-15 11:00:00'),
(3, 4, '2024-09-20 10:00:00'),
(4, 3, '2024-09-25 14:30:00'),
(5, 5, '2024-09-30 08:00:00');

create database if not exists `acss`;
use acss;
-- Insert dummy data into rooms
INSERT INTO rooms (name, capacity) VALUES
('Room A101', 30),
('Room B202', 40),
('Room C303', 50),
('Room D404', 25),
('Room E505', 35);

-- Insert dummy data into schedules
INSERT INTO schedules (courseId, roomId, startTime, endTime, dayOfWeek) VALUES
(1, 1, '2024-10-16 09:00:00', '2024-10-16 10:30:00', 'Monday'),
(2, 2, '2024-10-16 11:00:00', '2024-10-16 12:30:00', 'Tuesday'),
(3, 3, '2024-10-16 14:00:00', '2024-10-16 15:30:00', 'Wednesday'),
(4, 4, '2024-10-16 16:00:00', '2024-10-16 17:30:00', 'Thursday'),
(5, 5, '2024-10-16 08:00:00', '2024-10-16 09:30:00', 'Friday');
