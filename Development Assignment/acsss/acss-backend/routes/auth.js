// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createResponse = require('../utils/response');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(createResponse(0, 'User registered', { id: user.id, name: user.name }));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Registration failed'));
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(createResponse(1, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json(createResponse(0, 'Login successful', { token }));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Login failed'));
    }
});

module.exports = router;
