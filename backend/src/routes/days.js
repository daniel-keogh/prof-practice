const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const {
    addDay,
    getUsersDays,
    updateDay
} = require('../controllers/days');
const Day = require('../models/Day');

const router = express.Router();

router.post('/',
    passport.authenticate('jwt', { session: false }),
    addDay
);

router.put('/:id',
    [
        body('sleep')
            .notEmpty()
            .withMessage('sleep cannot be empty')
            .isNumeric()
            .withMessage('sleep must be a number'),
        body('water')
            .notEmpty()
            .withMessage('water cannot be empty')
            .isNumeric()
            .withMessage('water must be a number'),
        body('weight')
            .notEmpty()
            .withMessage('weight cannot be empty')
            .isNumeric()
            .withMessage('weight must be a number'),
        body('bloodPressure')
            .notEmpty()
            .withMessage('bloodPressure cannot be empty')
            .custom(async (value) => {
                value.forEach(val => {
                    if (typeof val.systolic != 'number' && typeof val.diastolic != 'number') {
                        return Promise.reject(`Invalid value for bloodPressure`);
                    }
                })
            })
            .custom(async (value) => {
                for (bp of value) {
                    const days = await Day.findOne({ 'bloodPressure.time': bp.time });

                    if (days) {
                        return Promise.reject(`Cannot add duplicate reading`);
                    }
                }
            })
            .isArray()
            .withMessage('bloodPressure must be an Array')
    ],
    passport.authenticate('jwt', { session: false }),
    updateDay
);

router.get('/:userId',
    passport.authenticate('jwt', { session: false }),
    getUsersDays
);

module.exports = router;
