var express = require('express');
var router = express.Router();

/* GET template by name */
router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render(__dirname + '/../../public/views/' + name);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/project/:project_id*', function(req, res, next) {
  res.render('project');
});

//api routes. use it to return json objects
router.get('/api/project/:project_id', function (req, res) {
  var project_id = req.params.project_id;

  res.send("nothing");
});

module.exports = router;
