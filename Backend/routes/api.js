const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const habitController = require('../controllers/habitController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailsController');
const auth = require('../middleware/auth');



router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);


router.get('/users',authMiddleware ,userController.one);
router.put('/users', authMiddleware, userController.update);
router.delete('/users', authMiddleware, userController.delete);


router.get('/habits', authMiddleware, habitController.all);
router.post('/habits', authMiddleware, habitController.create);

router.get('/emails', authMiddleware, emailController.all);
router.get('/emails/:id', authMiddleware, emailController.one)
router.post('/emails', authMiddleware, emailController.create);
router.put('/emails/:id', authMiddleware, emailController.update);
router.delete('/emails/:id', authMiddleware, emailController.delete);


module.exports = router;