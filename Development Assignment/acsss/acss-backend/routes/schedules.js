// routes/schedules.js

const express = require('express');
const Schedule = require('../models/Schedule');
const createResponse = require('../utils/response');


const router = express.Router();

router.post('/', async (req, res) => {
    const { courseId, roomId, startTime, endTime, dayOfWeek } = req.body;
    try {
        const schedule = await Schedule.create({ courseId, roomId, startTime, endTime, dayOfWeek });
        res.status(201).json(createResponse(0, 'Schedule created', schedule));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error creating schedule'));
    }
});

router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.findAll();
        res.json(createResponse(0, 'Schedules fetched', schedules));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching schedules'));
    }
});


module.exports = router;
