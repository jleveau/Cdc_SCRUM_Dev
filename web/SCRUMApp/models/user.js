var mongoose = require('mongoose');
var userdb = require('./userSchema');
var scumdb = require('./scrumdb');
var Project = mongoose.model('projects');
var user_project = mongoose.model('user_project');
var ObjectId = mongoose.Schema.Types.ObjectId;

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
            //followed_projects: [{ type : Number, ref: 'projects' }],
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
     * @param mail
     * @param cb : callback function
     */
    static count(username, mail, cb) {
        userdb.count({$or: [{username: username}, {mail: mail}]}, function (err, count) {
            if (err) throw err;
            cb(count);
        });
    }

    /**
     * this function search for a user in DB
     * @param username
     * @param password
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
    static getAllUsers(cb) {
        userdb.find({}, function (err, user) {
            if (err) throw err;
            cb(user);
        });
    }

    /**
     * return the user data
     * @param id : user id
     * @param cb : callback function
     */
    static getUserById(id, cb) {
        userdb.findById(id)
            .populate('user')
            .exec(function (err, user) {
                if (err) throw err;
                cb(user);
            });
    }

    /**
     * get projects data
     * @param idProject
     * @param cb
     */
    static getProjectsById(idProject, cb) {
        Project.find({_id: idProject}, function (err, projects) {
            if (err) throw err;
            cb(projects);
        });
    }

    /**
     * this function return id's of projects from a user. "voir schema user_project"
     * @param idUser
     * @param cb
     */
    static getUserProjects(idUser, cb) {
	
        user_project.find({_idUser: idUser}, function (err, ids) {
            if (err) return res.send(500, err.message);
            cb(ids)
        });
    }
}

module.exports = user;
