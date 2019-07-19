const express = require('express');
const router = express.Router();

const {create, categoryById, getCategory, update, remove, list} = require('../controller/category');
const {authRoute, isAuth, isAdmin} = require('../controller/auth');
const {userById} = require('../controller/user');

router.get('/category/:categoryId', getCategory);
router.post('/category/create/:id', authRoute, isAuth, isAdmin, create);
router.put('/category/:categoryId/:id', authRoute, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:id', authRoute, isAuth, isAdmin, remove);
router.get('/categories', list);


router.param('categoryId', categoryById);
router.param('id', userById);
module.exports = router;