//var hotelData = require('../data/hotel-data.json');
var dbconn = require('../data/dbconnection.js');

module.exports.productsGetAll = function(req, res) {
    console.log('GET the market data');
  //  console.log(req.query);

    var db = dbconn.get();
    var collection = db.collection('market');

    var offset = 0;
    var count = 10;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs) {
            console.log('data found',docs);
            res
                .status(200)
                .json(docs);
         });
    // console.log('db',db);


    //
    // var returnData = hotelData.slice(offset, offset+count);
    // res
    //     .status(200)
    //     .json( returnData );
};

module.exports.productsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('market');

    var _productId = req.params.productId;
    console.log('GET the product ID: ' + _productId);

    collection
        .findOne({productId:_productId}, function(err, doc) {
            res
                .status(200)
                .json( doc );
        });


};

module.exports.productsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('market');
    var newProduct;

    console.log('POST a new product:');

    if (req.body && req.body.name && req.body.price) {
        newProduct = req.body;
        newProduct.name = req.body.name;
        newProduct.price = eval(req.body.price);
      //  newProduct.price = parseInt(req.body.price, 10);
        collection.insertOne(newProduct, function(err, response) {
        console.log(response.ops);
        res
            .status(201)
            .json(response.ops);
        });
    } else {
      console.log('Data is missing.');
        res
            .status(400)
            .json( {message : 'some Require data is missing. Submit again.'} );
    }
};