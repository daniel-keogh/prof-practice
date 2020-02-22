const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/register', [
    body('name')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isAlphanumeric()
        .withMessage('Name cannot contain special characters'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .custom(async value => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('A user with that email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
], authController.registerUser);

router.post('/login', [
    body('email', 'Please enter a valid email address')
        .notEmpty()
        .isEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
], authController.login);

// router.post('/password_reset', authController.passwordReset);

module.exports = router;
