const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const { DATE } = require('sequelize');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// Endpoint to create a new user
router.post('/course',[auth, admin], async (req, res) => {
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

router.put('/course/:id',[auth, admin], async (req, res) => {
  try {
    const course = await Course.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/course/:id',[auth, admin], async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.is_deleted = true;
    course.deleted_at = new Date();
    await course.save();
    res.json({ message: 'Course marked as deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;