// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Schedule = require('./models/Schedule');

// Utility for creating standardized responses
const createResponse = (statusCode, statusDescription, data = null) => {
    return {
        statusCode,
        statusDescription,
        data,
    };
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// User registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(createResponse(0, 'success', { id: user.id, name: user.name, email: user.email }));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Registration failed', null));
    }
});

// User login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(createResponse(1, 'Invalid credentials', null));
        }
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json(createResponse(0, 'Login successful', { token }));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Login failed', null));
    }
});

// Create a student
app.post('/api/students', authenticateJWT, async (req, res) => {
    const { name, email, dateOfBirth, programEnrolled } = req.body;
    try {
        const student = await Student.create({ name, email, dateOfBirth, programEnrolled });
        res.status(201).json(createResponse(0, 'Student created successfully', student));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error creating student', null));
    }
});

// Get all students
app.get('/api/students', authenticateJWT, async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(createResponse(0, 'Students retrieved successfully', students));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching students', null));
    }
});

// Create a course
app.post('/api/courses', authenticateJWT, async (req, res) => {
    const { name, instructor, credits } = req.body;
    try {
        const course = await Course.create({ name, instructor, credits });
        res.status(201).json(createResponse(0, 'Course created successfully', course));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error creating course', null));
    }
});

// Get all courses
app.get('/api/courses', authenticateJWT, async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(createResponse(0, 'Courses retrieved successfully', courses));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching courses', null));
    }
});

// Enroll a student in a course
app.post('/api/enrollments', authenticateJWT, async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const enrollment = await Enrollment.create({
            studentId,
            courseId,
            enrollmentDate: new Date(),
        });
        res.status(201).json(createResponse(0, 'Enrollment created successfully', enrollment));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error enrolling student', null));
    }
});

// Get students enrolled in a course
app.get('/api/enrollments/:courseId', authenticateJWT, async (req, res) => {
    const { courseId } = req.params;
    try {
        const enrollments = await Enrollment.findAll({
            where: { courseId },
            include: [{ model: Student }],
        });
        res.json(createResponse(0, 'Enrollments retrieved successfully', enrollments));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching enrollments', null));
    }
});

// Create a schedule
app.post('/api/schedules', authenticateJWT, async (req, res) => {
    const { courseId, room, startTime, endTime, dayOfWeek } = req.body;
    try {
        const schedule = await Schedule.create({ courseId, room, startTime, endTime, dayOfWeek });
        res.status(201).json(createResponse(0, 'Schedule created successfully', schedule));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error creating schedule', null));
    }
});

// Get all schedules
app.get('/api/schedules', authenticateJWT, async (req, res) => {
    try {
        const schedules = await Schedule.findAll();
        res.json(createResponse(0, 'Schedules retrieved successfully', schedules));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching schedules', null));
    }
});

// Synchronize models with database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
