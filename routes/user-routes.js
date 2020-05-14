const express = require('express');
const router = express.Router();
const userController = require('../models/user-controller');
router.get('/:uid', userController.getUser);
router.post('/signup', userController.singup);
router.post('/login', userController.login);
module.exports = router;