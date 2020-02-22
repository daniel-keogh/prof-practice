const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/:id', usersController.getUser);

router.put('/:id', [
    body('name')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isAlphanumeric()
        .withMessage('Name cannot contain special characters'),
    body('email', 'Please enter a valid email address')
        .notEmpty()
        .isEmail()
], usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
