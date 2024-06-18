const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');

router.use(userRoutes);
router.use(courseRoutes);
router.use(studentRoutes);
router.use(enrollmentRoutes);

module.exports = router;