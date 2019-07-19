const express = require('express');
const router = express.Router();

//Routes :: imports
const {
    create, 
    read, 
    update, 
    remove, 
    list, 
    relatedProductsList, 
    productById,
    listProductCategory,
    listBySearch,
    getPhoto
} = require('../controller/product');
const {authRoute, isAuth, isAdmin} = require('../controller/auth');
const {userById} = require('../controller/user');

//Routes :: endpoints
router.get('/product/:prod_id', read);
router.get('/product/photo/:prod_id', getPhoto);
router.get('/product/related/:prod_id', relatedProductsList);
router.get('/products', list);
router.get('/products/category', listProductCategory);
router.post('/product/create/:id', authRoute, isAuth, isAdmin, create);
router.post("/products/by/search", listBySearch);
router.delete('/product/:prod_id/:id',authRoute, isAuth, isAdmin, remove);
router.put('/product/:prod_id/:id',authRoute, isAuth, isAdmin, update);

//Routes :: params
router.param('id', userById);
router.param('prod_id', productById);

module.exports = router;