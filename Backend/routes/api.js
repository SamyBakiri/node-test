const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const userController = require('../controllers/userController');


router.get('/users', userController.all);
router.post('/users', userController.create);


router.get('/habits',habitController.all);
router.post('/habits',habitController.create);

module.exports = router;