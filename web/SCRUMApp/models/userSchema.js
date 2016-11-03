var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
//var SALT_WORK_FACTOR = 10;

// create a shema

var userSchema = new Schema({
    username: {type: String, unique: true},
    mail: {type: String, unique: true},
    password: String,
    image: Buffer,
    first_name: String,
    last_name: String,
    // followed_projects: [{ type : Number, ref: 'projects' }],
    date_created: Date,
    date_updated: Date
});

/**
 * crypt password before save user data in DB
 */
/*
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
*/
// a model using the shema
var myusers = mongoose.model('users', userSchema);

// make this available in node applications
module.exports = myusers;


