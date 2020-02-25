const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/register', [
    body('name')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isAlphanumeric()
        .withMessage('name cannot contain any special characters'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .custom(async value => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('A user with that email address already exists');
            }
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters long')
        .isString()
        .withMessage('password must be a string')
], authController.registerUser);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isString()
        .withMessage('password must be a string')
], authController.login);

router.put('/password_reset', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters long'),
    body('old_password')
        .notEmpty()
        .withMessage('old_password cannot be empty')
        .isString()
        .withMessage('old_password must be a string')
], authController.passwordReset);

module.exports = router;
