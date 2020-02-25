const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/users');
const User = require('../models/user');

const router = express.Router();

router.get('/:id', usersController.getUser);

router.put('/:id', [
    body('name')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isAlphanumeric()
        .withMessage('name cannot contain special characters'),
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
], usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
