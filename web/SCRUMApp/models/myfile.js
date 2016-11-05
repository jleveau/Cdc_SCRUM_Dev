var user = require('./../../models/userSchema');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/persons', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }else {
        console.log("Database localhost:27017/scrumdb ");
    }

});


