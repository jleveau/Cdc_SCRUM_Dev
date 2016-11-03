var userdb = require('./userSchema');
/**
 * this class ...
 *
 */
class user {

    /**
     * to add a new user in DB
     * @param username
     * @param email
     * @param password
     */
    static addUser(username, email, password) {
        var newuser = new userdb({
            username: username,
            mail: email,
            password: password,
            image: null,
            first_name: null,
            last_name: null,
            followed_projects: [{ type : Number, ref: 'projects' }],
            date_created: new Date(),
            date_updated: null
        });
        newuser.save(function (err) {
            if (err) throw err;
        });
    }

    /**
     * this function count the number of users with the given 'username' or 'mail'
     * @param username
     * @param cb : callback function
     */
    static count(username, email, cb) {
        userdb.count({$or: [{username: username}, {mail: email}]}, function (err, count) {
            if (err) throw err;
            cb(count);
        });
    }

    /**
     * this function search for a user in DB
     * @param username
     * @param email
     * @param cb : callback function
     */
    static signIn(username, password, cb) {
        userdb.find({username: username, password: password}, function (err, user) {
            if (err) throw err;
            cb(user);
        });
    }

    /**
     * this function update a user record
     * @param username
     * @param firstName
     * @param lastName
     * @param cb : callback function
     */
    static updateUserRecord(username, firstName, lastName, cb) {
        userdb.findOneAndUpdate({username: username}, {
            first_name: firstName,
            last_name: lastName, date_updated: new Date()
        }, function (err, user) {
            if (err) throw err;
            cb(user);
        });
    }

    /**
     * this function get all users from db
     * @param cb : callback function
     */
    static getAllUsers(cb){
        userdb.find({},function (err, user) {
            if (err) throw err;
            cb(user);
        });
    }
}

module.exports = user;