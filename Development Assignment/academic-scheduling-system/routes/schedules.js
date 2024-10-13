const express = require('express');
const { Schedule, Room } = require('../models');
const authMiddleware = require('../middleware/auth');
const xml2js = require('xml2js');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating schedule' });
  }
});

router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching schedules' });
  }
});

router.get('/export', async (req, res) => {
  try {
    const schedules = await Schedule.findAll();

    const builder = new xml2js.Builder();
    const xml = builder.buildObject({
      schedules: {
        schedule: schedules.map(schedule => ({
          courseId: schedule.courseId,
          roomId: schedule.roomId,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          dayOfWeek: schedule.dayOfWeek
        }))
      }
    });

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exporting schedules' });
  }
});

module.exports = router;