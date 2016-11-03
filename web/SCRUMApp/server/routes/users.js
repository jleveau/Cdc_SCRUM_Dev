var express = require('express');
var session = require('express-session');
var body = require('body-parser');
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
    user.count(req.body.username, req.body.email, function (count){
        if (count > 0) {
            console.log("REQUEST DENIED");
        } else {
            user.addUser(req.body.username, req.body.email, req.body.password);
            res.send('respond with resource');
        }
        //TODO add flush messages
    });
    //next();
});

/**
 * route retrieve all users
 */
router.get('/allusers', function (req, res, next) {
    return user.getAllUsers(function(users){
        res.status(200).jsonp(users);
    });
    //next();
});

/**
 * route to sign in
 * create session with user data
 * locals.user_data : to get user data in our views
 */
router.post('/signin', function (req, res, next) {
    if (!req.session.user_session) {
        req.session.user_session = {};
    }
    user.signIn(req.body.username, req.body.password, function (user_info) {
        if (user_info[0] !== undefined) {
            req.session.user_session = user_info[0]["username"] + " mail : " + user_info[0]["mail"];
            res.locals.user_data = req.session.user_session;
            res.render('/');
        } else {
            res.send("user doesn't exist !");
        }
    })
    //TODO : redirect the user to continue the registration or in his profile page.
});

/**
 * route to sign out
 * destroy session
 */
router.get('/signout', function (req, res, next) {
    req.session.destroy();
    res.send('session destroyed !');
    //TODO redirect the user.
});


/**
 * function pour verifier si un user est connect
 */

module.exports = router;