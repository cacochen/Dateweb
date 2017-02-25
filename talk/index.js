/**
 * Created by Domain on 2/24/2017.
 */
var hello = function(name){
    console.log('hello' + name);
};
var intro = function(){
    console.log('I am a node file called index.js')
};

module.exports = {
    hello : hello,
    intro : intro

};