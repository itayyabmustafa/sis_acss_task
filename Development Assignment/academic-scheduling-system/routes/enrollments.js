const express = require('express');
const { Enrollment } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating enrollment' });
  }
});

router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching enrollments' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const enrollments = req.body;
    await Enrollment.bulkCreate(enrollments);
    res.status(201).json({ message: 'Enrollments imported successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error importing enrollments' });
  }
});

module.exports = router;