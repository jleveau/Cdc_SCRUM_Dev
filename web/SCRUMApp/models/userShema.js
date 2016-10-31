var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a shema

var userShema = new Schema({
    username: String,
    mail: String,
    password: String,
    image: Buffer,
    first_name: String,
    last_name: String,
   // followed_projects: [{ type : Number, ref: 'projects' }],
    date_created: Date,
    date_updated: Date
});

// a model using the shema
var myusers = mongoose.model('users',userShema);

// make this available in node applications
module.exports = myusers


