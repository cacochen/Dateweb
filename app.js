/**
 * Created by Domain on 2/24/2017.
 */
require('./hello');
var goodbye = require('./talk/goodbye');
var talk = require('./talk');

talk.intro();
talk.hello('Wei');
goodbye();