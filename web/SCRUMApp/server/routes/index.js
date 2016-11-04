var express = require('express')

//var express = require('express-session');
var router = express.Router();

/* GET template by name */
router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render(__dirname + '/../../public/views/' + name);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
