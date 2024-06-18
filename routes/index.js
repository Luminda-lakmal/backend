const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

router.use(userRoutes);
router.use(courseRoutes);
router.use(studentRoutes);

module.exports = router;