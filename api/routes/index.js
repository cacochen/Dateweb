/**
 * Created by Domain on 2/27/2017.
 */
var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');

router
    .route('/products')
    .get(ctrlProducts.productsGetAll);

router
    .route('/products/:productId')
    .get(ctrlProducts.productsGetOne);

router
    .route('/products/new')
    .post(ctrlProducts.productsAddOne);

module.exports = router;
