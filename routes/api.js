const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const emailsController = require('../controllers/emailsController');

router.get('/habits',habitController.all);
router.post('/habits',habitController.create);

router.get("/emails", emailsController.all);
router.post("/emails", emailsController.create);

module.exports = router;