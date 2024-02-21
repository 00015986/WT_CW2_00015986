const express = require('express');
const router = express.Router();
const user_controller = require('../../../controllers/web/user');

router.get('/register', user_controller.register);

module.exports = router;