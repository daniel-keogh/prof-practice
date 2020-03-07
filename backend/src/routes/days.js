const express = require('express');
const { body } = require('express-validator');
const daysController = require('../controllers/days');

const router = express.Router();

router.post('/days', [
    body('user_id')
        .notEmpty()
        .withMessage('user_id cannot be empty'),
    body('date')
        .notEmpty()
        .withMessage('date cannot be empty')
], daysController.addDay);

router.put('/days/:id', daysController.updateDay);

router.get('/days/:userId', daysController.getUsersDays);

module.exports = router;
