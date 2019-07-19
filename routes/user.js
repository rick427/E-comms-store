const express = require('express');
const router = express.Router();

const {userById, getUser, updateUser} = require('../controller/user');
const {authRoute, isAuth, isAdmin} = require('../controller/auth');


router.get('/user/:id', authRoute, isAuth, getUser);
router.put('/user/:id', authRoute, isAuth, updateUser);

router.param('id', userById);
module.exports = router;