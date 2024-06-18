const express = require('express');
const Student = require('../model/students');
const router = express.Router();


router.post('/student', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/student', async (req, res) => {
    try {
        const students = await Student.findAll({
            where: {
                is_deleted: false
            }
        });
        res.status(201).json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/student/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get stdent by user id
router.get('/student/user/:id', async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                is_deleted: false,
                user_id: req.params.id
            }
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/student/:id', async (req, res) => {
    try {
        const student = await Student.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/student/:id', async (req, res) => {
    try {
        const student = await Student.update({
            is_deleted: true,
        },
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;