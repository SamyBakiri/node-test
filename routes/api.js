const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');


router.get('/habits',habitController.all);
router.post('/habits',habitController.create);

module.exports = router;