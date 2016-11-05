var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
//var SALT_WORK_FACTOR = 10;

// create a schema

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

var myusers = mongoose.model('users', userSchema);
module.exports = myusers;

