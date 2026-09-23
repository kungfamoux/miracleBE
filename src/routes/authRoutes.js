const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post('/register', validateRegister, validationMiddleware, register);
router.post('/login', validateLogin, validationMiddleware, login);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', authMiddleware, logout);

module.exports = router;
