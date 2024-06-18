const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');

router.use(userRoutes);
router.use(courseRoutes);
router.use(enrollmentRoutes);

module.exports = router;