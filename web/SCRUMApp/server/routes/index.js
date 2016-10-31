var express = require('express');
var router = express.Router();
var models = require("../../controllers/projects");


/* GET template by name */
router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render(__dirname + '/../../public/views/' + name);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');

});


//api routes. use it to return json objects
router.get('/api/project/:project_id', function (req, res) {
    var project_id = req.params.project_id;

    res.send("nothing");
});

//api routes. use it to return json objects
router.get('/api/reachable_projects', function (req, res) {
    res.send("{projects : [" +
        "{ id : 1," +
        "  name : toto}," +
        "{  id : 2," +
        "  name : tata" +
        "}]}");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET template by name */
router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render(__dirname + '/../../public/views/' + name);

});

module.exports = router;
