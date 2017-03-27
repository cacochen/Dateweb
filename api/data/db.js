/**
 * Created by Domain on 3/19/2017.
 */
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/moviemarket';

mongoose.Promise = global.Promise;
mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to '+ dburl);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose error: ' + err);
});

// process.on('sight', function() {
//     mongoose.connection.close(function() {
//         console.log('Mongoose disconnected through app termination');
//         process.exit(0);
//     });
// });

// declare data model
require('./products.model.js');
require('./persons.model.js');