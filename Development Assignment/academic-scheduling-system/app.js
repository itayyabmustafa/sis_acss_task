const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const scheduleRoutes = require('./routes/schedules');
const enrollmentRoutes = require('./routes/enrollments');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/enrollments', enrollmentRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`ACSS server is running on port ${PORT}`);
  });
});