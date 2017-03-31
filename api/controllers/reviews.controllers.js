/**
 * Created by Domain on 3/25/2017.
 */
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
module.exports.reviewsGetAll = function(req, res) {

    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    Product
        .findById(_productId)
        .select('reviews')
        .exec(function(err, doc) {
            console.log("reviews document",doc);
            res
                .status(200)
                .json(doc.reviews);
        });

};

module.exports.reviewsGetOne = function(req, res) {
    var _productId = req.params.productId;
    var _reviewId = req.params.reviewId;
    console.log('Get reviewId: '+ _reviewId + ' and productId:' + _productId);

    Product
        .findById(_productId)
        .select('reviews')
        .exec(function(err, product) {
            if(err) {
                console.log('Error on finding review');
                res
                    .status(500)
                    .json(err)
            } else {
                console.log("reviews document", product);
                var review = product.reviews.id(_reviewId);
                res
                    .status(200)
                    .json(review);
            }
        });
};

var _addReview = function(req, res, doc){

    doc.reviews.push({
        name : req.body.name,
        dislike : parseInt(req.body.dislike, 10),
        review : req.body.review
    });

    doc.save(function(err, docUpdated) {
        if (err) {
            res
                .status(500)
                .json(err)
        } else {
            res
                .status(201)
                .json(docUpdated.reviews[docUpdated.reviews.length - 1])
        }
    });
};

module.exports.reviewsAddOne = function(req, res) {
    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    Product
        .findById(_productId)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status:200,
                message:doc
            }
            if(err) {
                console.log('Error on finding object #:' + err);
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Object is not found in Database');
                response.status = 404;
                response.message = {
                    'message' : 'object ID was not found '+ _productId
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message)
            }
        });

    // For counting all dislikes and set the total
    // var dislike = parseInt(req.body.dislike, 10);
    // Product
    //     .findById(_productId)
    //     .update({},{$inc : {dislikeTotal : dislike}},function(err) {
    //         if (err) {
    //             console.log('failure on set dislikeTotal');
    //             return;
    //         }
    //     });


};


module.exports.reviewsUpdateOne = function (req, res) {

    var _productId = req.params.productId;
    var _reviewId = req.params.reviewId;
    console.log('Get reviewId: '+ _reviewId + ' and productId: ' + _productId);


    Product
        .findById(_productId)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            }
            var thisReview;
            if(err) {
                console.log('Error on finding object');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
               console.log('Object is not found in database');
               response.status = 404;
               response.message = {
                   'Message' : 'Not found the id ' + _productId
               };
            } else {
                thisReview = doc.reviews.id(_reviewId);
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + _reviewId
                    };
                }
            }

            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisReview.name = req.body.name;
                thisReview.dislike = parseInt(req.body.dislike, 10);
                thisReview.review = req.body.review;

                doc.save(function(err) {
                    if(err) {
                        res
                            .status(500)
                            .json(err)
                    } else {
                        res
                            .status(204)
                            .json({'Message' : 'Successfully Updated'})
                    }
                });
            }
        });

};


module.exports.reviewsDeleteOne = function(req, res) {
    var _productId = req.params.productId;
    var _reviewId = req.params.reviewId;
    console.log('Get reviewId: '+ _reviewId + ' and productId: ' + _productId);


    Product
        .findById(_productId)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            }
            var thisReview;
            if(err) {
                console.log('Error on finding object');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Object is not found in database');
                response.status = 404;
                response.message = {
                    'Message' : 'Not found the id ' + _productId
                };
            } else {
                thisReview = doc.reviews.id(_reviewId);
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + _reviewId
                    };
                }
            }

            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.reviews.id(_reviewId).remove();

                doc.save(function(err) {
                    if(err) {
                        res
                            .status(500)
                            .json(err)
                    } else {
                        console.log('Review is deleted: ', _reviewId);
                        res
                            .status(204)
                            .json({'Message' : 'Successfully Deleted'})
                    }
                });
            }
        });


};
