// routes/enrollments.js

const express = require('express');
const Enrollment = require('../models/Enrollment');
const createResponse = require('../utils/response');

const router = express.Router();

router.post('/', async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const enrollment = await Enrollment.create({
            studentId,
            courseId,
            enrollmentDate: new Date(),
        });
        res.status(201).json(createResponse(0, 'Enrollment created', enrollment));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error enrolling student'));
    }
});

router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        const enrollments = await Enrollment.findAll({ where: { courseId } });
        res.json(createResponse(0, 'Enrollments fetched', enrollments));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching enrollments'));
    }
});

module.exports = router;
