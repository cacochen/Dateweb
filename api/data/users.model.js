/**
 * Created by Domain on 3/20/2017.
 */
var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({

    username : {
        type : String,
        unique : true,
        required : true
    },

    name : String,

    password : {
        type : String,
        required : true
    }
});



mongoose.model('User', userSchema,'userdb');

