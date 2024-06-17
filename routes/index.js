const express = require('express');
const router = express.Router();
const Course = require('../model/course');

// Endpoint to create a new user
router.post('/course', async (req, res) => {
  try {
    const user = await Course.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;