// routes/rooms.js

const express = require('express');
const Room = require('../models/Room');
const createResponse = require('../utils/response');

const router = express.Router();

router.post('/', async (req, res) => {
    const { roomName, capacity } = req.body;
    try {
        const room = await Room.create({ roomName, capacity });
        res.status(201).json(createResponse(0, 'Room created', room));
    } catch (error) {
        res.status(400).json(createResponse(1, 'Error creating room'));
    }
});

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(createResponse(0, 'Rooms fetched', rooms));
    } catch (error) {
        res.status(500).json(createResponse(1, 'Error fetching rooms'));
    }
});

module.exports = router;
