const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Course = require('../model/course')
const User = require('../model/users');
const Enrollment = require('../model/enrollment');

router.post('/enrollment', async (req, res) => {
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
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                    where: { is_deleted: false },
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['title'],
                    where: { is_deleted: false },
                },
            ],
        });
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get enrollments by student id
router.get('/enrollment/:sid', async (req, res) => {
    try {
        const student = await User.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const enrollments = await Enrollment.findAll({
            where: {
                is_deleted: false,
                student_id: req.params.sid
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                    where: { is_deleted: false },
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['title'],
                    where: { is_deleted: false },
                },
            ],
        });
        res.status(201).json(enrollments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/enrollment/:id', async (req, res) => {
    try {
        const enr = await Enrollment.findByPk(req.params.id);
        if (!enr) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        const enrollment = await Enrollment.destroy(
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