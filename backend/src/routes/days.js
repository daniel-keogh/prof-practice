const express = require('express');
const { body } = require('express-validator');
const daysController = require('../controllers/days');

const router = express.Router();

router.post('/days', [
    body('user_id')
        .notEmpty()
        .withMessage('user_id cannot be empty')
        .isMongoId()
        .withMessage("user_id must be a Mongo ID"),
    body('date')
        .notEmpty()
        .withMessage('date cannot be empty')
], daysController.addDay);

router.put('/days/:id', [
    body('water')
        .notEmpty()
        .withMessage('water cannot be empty')
        .isNumeric()
        .withMessage('water must be a number'),
    body('sleep')
        .notEmpty()
        .withMessage('sleep cannot be empty')
        .isNumeric()
        .withMessage('sleep must be a number')
], daysController.updateDay);

router.get('/days/:userId', daysController.getUsersDays);

module.exports = router;
