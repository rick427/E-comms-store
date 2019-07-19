const express = require('express');
const {register, login, logout, authRoute} = require('../controller/auth');
const {userRegisterValidate} = require('../helpers/validator');
const router = express.Router();

router.post('/register', userRegisterValidate, register);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;