/**
 * Created by Domain on 3/22/2017.
 */
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    dislike : {       // 0 means I can watch it again, 1 means I cannot watch it again, 2 means I regret watching it
        type : Number,
        min : 0,
        max : 2,
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

var productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    director : String,
    language : [String],
    cast : [String],
    runtime : Number,
    boxOffice : Number,
    dislikeTotal : {
        type : Number,
        default: 0
    },
    reviews : [reviewSchema]
});

mongoose.model('Product', productSchema,'moviemarket');
mongoose.model('reviews',reviewSchema,'moviemarket');