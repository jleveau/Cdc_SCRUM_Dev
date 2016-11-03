var mongoose = require('mongoose');
var userdb = require('./models/userSchema');
var bcrypt = require('bcrypt');
var user = require('./models/user');

//////////////////////////////////////////////////
//////////// File for random tests //////////////
////////////////////////////////////////////////

var connStr = 'mongodb://localhost:27017/scrumdb';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


var testUser = new userdb({
    username: 'TEST',
    mail: 'TEST',
    password: 'TEST',
    image: null,
    first_name: null,
    last_name: null,
    // followed_projects: [{ type : Number, ref: 'projects' }],
    date_created: new Date(),
    date_updated: new Date()

});

/*
testUser.save(function (err) {
    if (err) throw err;
});
*/

// ***** Compare function *****
comparePassword =function(candidatePassword,passwordhashed, cb) {
    bcrypt.compare(candidatePassword, passwordhashed, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

comparePassword('TEST','$2a$10$SSKBfHfy9onrW8JI7.rCKOEYRTpj8lKhSmSvODwCuFRbqs8zWrSja',function(err,ismatch){
    if(err) throw err;
    console.log(ismatch);
});


// userSchema.methods.comparePassword

// TO COMPARE PASSWORDS
/*
 link(rel='stylesheet', href='/css/bootstrap.min.css')
 link(rel='stylesheet', href='/css/angular-material.css')
 script(src='/js/angular.js')
 script(src='/js/jquery.min.js')
 script(src='/js/bootstrap.min.js')
 script(src='/js/angular-route.js')
 script(src='/js/angular-resource.js')
 script(src='/js/angular-material.js')
 script(src='/js/angular-animate.js')
 script(src='/js/angular-aria.js')
 script(src='/public/angular/routes/routes.js')
 script(src='/public/angular/controller/home.js')
 script(src='/public/angular/controller/project.js')
 script(src='/public/angular/controller/users.js')
 script(src='/public/angular/services/project_services.js')
 script(src='/public/angular/core.js')
 */