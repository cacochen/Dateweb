/**
 * Created by Domain on 2/27/2017.
 */
var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');
var ctrlPersons = require('../controllers/persons.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// product routers of market database
router
    .route('/products')
    .get(ctrlProducts.productsGetAll)
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
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/products/:productId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);




// person routers of userDB

router
    .route('/persons')
    .get(ctrlPersons.personsGetAll);

router
    .route('/persons/:personId')
    .get(ctrlPersons.personsGetOne);



module.exports = router;