/**
 * Created by Domain on 3/22/2017.
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports.personsGetAll = function(req, res) {

    var offset = 0;
    var count = 5;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }


    Person
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, docs) {
            console.log('Found person', docs.length);
            res
                .json(docs);
        });
};

module.exports.personsGetOne = function(req, res) {


    var _personId = req.params.personId;
    console.log('GET the person ID: ' + _personId);

    Person
        .findById(_personId)
        .exec(function(err, doc) {
            res
                .status(200)
                .json( doc );
            console.log('Get the data');
        });


};