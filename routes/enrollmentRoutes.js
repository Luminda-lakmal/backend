const express = require('express');
const Enrollment = require('../model/enrollment');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/enrollment',[auth, admin], async (req, res) => {
    try {
        const enrollment = await Enrollment.create(req.body);
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/enrollment', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            where: {
                is_deleted: false
            }
        });
        res.status(201).json(enrollments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get enrollments by student id
router.get('/enrollment/:sid', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            where: {
                is_deleted: false,
                student_id: req.params.sid
            }
        });
        res.status(201).json(enrollments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/enrollment/:id',[auth, admin], async (req, res) => {
    try {
        const enrollment = await Enrollment.update({
            is_deleted: true,
        },
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;