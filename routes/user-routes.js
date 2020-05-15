const express = require('express');
const router = express.Router();
const userController = require('../models/user-controller');
const {check} = require('express-validator');

router.get('/:uid', userController.getUser);
router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('password').isLength({min:5}),
        check('email').isEmail()
    ]
    ,userController.singup);
router.post('/login', userController.login);
router.get('/', userController.getUsers);

module.exports = router;