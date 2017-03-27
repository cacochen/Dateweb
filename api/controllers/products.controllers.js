/**
 * Created by Domain on 3/12/2017.
 */
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


module.exports.productsGetAll = function(req, res) {

    console.log('GET the market data');
    console.log(req.query);

    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    // check url validity
    if(isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                'message' : 'offset and count should be numbers'
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                'message' : 'Count limit is' + maxCount +'exceeded'
            });
        return;
    }

    Product
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, docs){
            console.log("Found products", docs.length);
            res
                .json(docs);
        });
};

module.exports.productsGetOne = function(req, res) {

    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    Product
        .findById(_productId)
        .exec(function(err, doc) {
            var response = {
                status:200,
                message:doc
            }
            if(err) {
                console.log('Error on finding object');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    'message' : 'Object ID was not found'
                };
            }
            res
                .status(response.status)
                .json(response.message)

        });
};

var _splitArray = function(input) {
    var output;
    if (input&&input.length > 0) {
        output = input.split(';');
    } else {
        output = [];
    }
    return output;
};


module.exports.productsAddOne = function(req, res) {

    Product
        .create({
            name : req.body.name,
            director : req.body.director,
            language : _splitArray(req.body.language),
            cast : _splitArray(req.body.cast),
            runtime : parseInt(req.body.runtime, 10),
            boxOffice : parseInt(req.body.boxOffice, 10)
        }, function(err, product) {
          if(err) {
              console.log('Error on creating object');
              res
                  .status(400)
                  .json(err)
          } else {
              console.log('Object created', product);
              res
                  .status(201)
                  .json(product)
          }
        });

};


module.exports.productsUpdateOne = function(req, res) {
    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    Product
        .findById(_productId)
        .select('-reviews')
        .exec(function(err, doc) {
            var response = {
                status:200,
                message:doc
            }
            if(err) {
                console.log('Error on finding object');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    'message' : 'Object ID was not found'
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message)
            } else {
                doc.name = req.body.name;
                doc.director = req.body.director;
                doc.language = _splitArray(req.body.language);
                doc.cast = _splitArray(req.body.cast);
                doc.runtime = parseInt(req.body.runtime, 10);
                doc.boxOffice = parseInt(req.body.boxOffice, 10);

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

module.exports.productsDeleteOne = function(req, res) {
    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    Product
        .findByIdAndRemove(_productId)
        .exec(function(err, doc) {
            if(err) {
                res
                    .status(404)
                    .json(err)
            } else {
                console.log('Deleting object: ' + _productId);
                res
                    .status(204)
                    .json()
            }
        });
};