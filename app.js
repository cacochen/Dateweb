/**
 * Created by Domain on 2/24/2017.
 */

var express = require('express');
var app = express();
var path = require('path');

app.set('port',3000);

app.use(express.static(path.join(__dirname,'public')));



/*
app.get('/',function(req,res) {
     res.status(200)
         .sendFile(path.join(__dirname,'public','index.html'));
});
*/
app.get('/appFile',function(req,res){
    //  res.send("Hello,develop,it's node.js");
    res.status(200)
        .sendFile(path.join(__dirname,'app.js'));
});

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('connected on port '+ port );
});
console.log('program end');
