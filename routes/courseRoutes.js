const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const { DATE } = require('sequelize');

// Endpoint to create a new user
router.post('/course', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/course', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: {
        is_deleted: false
      }
    });
    res.status(201).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/course/:id', async (req, res) => {
  try {
    const course = await Course.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/course/:id', async (req, res) => {
  try {
    const course = await Course.update({
      is_deleted: true,
      deleted_at: DATE(new DATE())
    },
      {
        where: {
          id: req.params.id
        }
      });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;