const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');

router.use(userRoutes);
router.use(courseRoutes);

module.exports = router;