const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const {
    deleteUser,
    getUser,
    updateUser
} = require('../controllers/users');
const User = require('../models/User');

const router = express.Router();

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    getUser
);

router.put('/:id',
    [
        body('name')
            .notEmpty()
            .withMessage('name cannot be empty'),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address')
            .custom(async (value, { req }) => {
                // Make sure that if changing email, the new email isn't already taken
                const user = await User.findOne({ email: value });
                if (user && (user._id != req.params.id)) {
                    return Promise.reject('A user with that email address already exists');
                }
            }),
    ],
    passport.authenticate('jwt', { session: false }),
    updateUser
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    deleteUser
);

module.exports = router;
