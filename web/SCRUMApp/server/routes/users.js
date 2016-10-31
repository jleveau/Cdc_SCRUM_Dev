var express = require('express');
var router = express.Router();
var body = require('body-parser');


var user = require('./../../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource man');
});

/**
 * route to add a new user
 * first that verify if there is an existing user in DB.
 */
router.post('/adduser', function (req, res, next) {
    user.count(req.body.username, req.body.email, function (count) {
        if (count > 0) {
            console.log("REQUEST DENIED");
        } else {
            user.addUser(req.body.username, req.body.email, req.body.password);
            res.send('respond with a resource');
        }
        //TODO add flush messages
    });
});

module.exports = router;
