var express = require('express');
var session = require('express-session');
var body = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var user = require('./../../models/user');
var router = express.Router();

router.use(session({
    secret: 'scrumproject2016univBordeaux',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource man');
});

/**
 * route to add a new user
 * first that verify if there is an existing user in DB.
 */
router.post('/adduser', function (req, res, next) {
    if (req.body !== undefined) {
        user.count(req.body.username, req.body.mail, function (count) {
            if (count > 0) {
                res.error = {error: "Username or email already taken"};
                res.status(400).send(res.error);
            } else {
                var hashPassword = bcrypt.hashSync(req.body.password);
                user.addUser(req.body.username, req.body.mail, hashPassword);
                console.log("here !");
                res.status(200).json({
                    status: 'Registration successful!'
                });
            }
        });
    } else {
        res.error = {error: "Undefiened data"};
        res.status(400).send(res.error);
    }
});

/**
 * route retrieve all users
 */
router.get('/info/:id', function (req, res, next) {
    return user.getUserById(req.params.id, function (user) {
        res.status(200).jsonp(user);
    });
});


/**
 * route to retrived currently logged user
 */
router.get('/logged', function (req, res, next) {
    console.log("GET /logged");
    if (req.session.user_session) {
        res.status(200).jsonp({id: req.session.user_session});
    }
    else {
        res.status(200).jsonp(false);
    }
});

/**
 * route retrieve all users
 */
router.get('/allusers', function (req, res, next) {
    return user.getAllUsers(function (users) {
        res.status(200).jsonp(users);
    });
    //next();
});
/**
 * Just for a test - GET PROJECTS by user ID. from session or params
 */

router.get('/userprojects/:user_id', function (req, res) {
    user.getUserProjects(req.params.user_id, function (user_projects) {
        var project_array = [];
        var user_project = {};
        var mongoose = require("mongoose");
        var Schema = mongoose.model('projects');
        for (user_project of user_projects) {
            console.log(user_project);
            Schema.findById(user_project._idProject, function (err, project) {
                project_array.push(project);
                if (user_projects.length == project_array.length) {
                    res.status(200).jsonp(project_array);
                }
            })
        }
    });
});

/**
 * route to sign in
 * create session with user data
 * locals.user_data : to get user data in our views
 */

router.post('/login', function (req, res, next) {
    if (!req.session.user_session) {
        req.session.user_session = {};
    }
    if (req.body !== undefined) {
        user.signIn(req.body.username,function (user_info) {
            if (user_info[0] !== undefined && bcrypt.compareSync(req.body.password,user_info[0]['password'])) {
                req.session.user_session = user_info[0]["_id"];
                res.locals.user_data = req.session.user_session;
                res.status(200).jsonp(user_info);
            } else {
                res.status(400).jsonp({message: "Wrong password or username"});
            }
        })
    } else {
        res.status(400).jsonp({message: "req.body, undefined"});
    }
});

/**
 * route to sign out
 * destroy session
 */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.send('session destroyed !');
});

module.exports = router;
