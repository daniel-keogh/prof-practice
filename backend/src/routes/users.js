const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/:id', usersController.getUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser)

module.exports = router;
