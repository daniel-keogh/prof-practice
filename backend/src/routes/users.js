const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/users');

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
], usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
