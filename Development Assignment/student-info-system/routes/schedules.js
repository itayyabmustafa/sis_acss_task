const express = require('express');
const { Schedule } = require('../models');
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

router.post('/import', async (req, res) => {
  try {
    const xmlData = req.body.xml;
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    const schedules = result.schedules.schedule;
    for (const scheduleData of schedules) {
      await Schedule.create({
        courseId: scheduleData.courseId[0],
        roomId: scheduleData.roomId[0],
        startTime: scheduleData.startTime[0],
        endTime: scheduleData.endTime[0],
        dayOfWeek: scheduleData.dayOfWeek[0]
      });
    }

    res.status(201).json({ message: 'Schedules imported successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error importing schedules' });
  }
});

module.exports = router;