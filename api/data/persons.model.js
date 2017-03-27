/**
 * Created by Domain on 3/20/2017.
 */
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    },
    review : {
        type : String,
        required : true
    },
    createOn : {
        type : Date,
        'default' : Date.now
    }
});

var personSchema = new mongoose.Schema({
    name : {
        type : String
    },
    age : {
        type : Number,
        min : 16,
    },
    employment : String,
    Location : String,
    hobbies : [String],
    introduction : String,
    reviews : [reviewSchema]
});



mongoose.model('Person', personSchema,'userdb');

