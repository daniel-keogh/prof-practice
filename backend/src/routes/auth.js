const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/password_reset', authController.passwordReset);

module.exports = router;
