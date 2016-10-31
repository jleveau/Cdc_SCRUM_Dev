var userdb = require('./userShema');
/**
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
            // followed_projects: [{ type : Number, ref: 'projects' }],
            date_created: new Date(),
            date_updated: new Date()

        });

        newuser.save(function (err) {
            if (err) throw err;
        });
    }

    /**
     * to count the number of users with the given 'username' or 'mail'
     * @param username
     * @param cb
     */
    static count(username,email,cb){
        userdb.count({$or:[{username: username}, {mail: email}]}, function(err, count)
        {
            if (err) throw err;
            cb(count);
        });
    }

    /**
     *
     * @param username
     * @param email
     * @param cb
     */
    static findUserwithUsername(username, email, cb) {
        userdb.find({username: username, mail: email}, function (err, user) {
            if (err) throw err;
            cb(user);
        });
    }
}

module.exports = user;