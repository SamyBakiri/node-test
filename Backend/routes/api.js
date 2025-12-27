const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const habitController = require('../controllers/habitController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);


router.get('/users',authMiddleware ,userController.all);
router.post('/users', authMiddleware,userController.create);


router.get('/habits', authMiddleware, habitController.all);
router.post('/habits', authMiddleware, habitController.create);


module.exports = router;