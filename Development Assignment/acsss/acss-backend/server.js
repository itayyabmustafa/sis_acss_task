// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const scheduleRoutes = require('./routes/schedules');
const enrollmentRoutes = require('./routes/enrollments');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Synchronize models with database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(5001, () => {
            console.log('ACSS is running on port 5001');
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
