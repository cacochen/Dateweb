/**
 * Created by Domain on 2/27/2017.
 */
var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// product routers of market database
router
    .route('/products')
    .get(ctrlUsers.authenticate, ctrlProducts.productsGetAll)
    .post(ctrlProducts.productsAddOne);

router
    .route('/products/:productId')
    .get(ctrlProducts.productsGetOne)
    .put(ctrlProducts.productsUpdateOne)
    .delete(ctrlProducts.productsDeleteOne);

// review routers
router
    .route('/products/:productId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
    .route('/products/:productId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);




// User Authentication

router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);



module.exports = router;