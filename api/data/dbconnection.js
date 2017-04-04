/**
 * Created by Domain on 2/28/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/moviemarket';

var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log('Connection to mongoDB failed.');
            return;
        }
        _connection = db;
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open : open,
    get : get
};