var express = require('express');
var router = express.Router();
var models = require("../../controllers/projects");
var routes = require("../../server/routes/index");

/* GET template by name */
router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render(__dirname + '/../../public/views/' + name);
});


/////////Projects
router.get('/api/reachable_projects', function (req, res) {
    models.findAllProjects(req,res);
});

router.get('/api/all_projects', function (req, res) {
    models.findAllProjects(req,res);
});

router.get('/api/project/:project_id', function (req, res) {
    models.findById(req,res);
});

router.post('/project', function(req, res) {
    models.addproject(req,res);
});

router.put('/project', function(req, res) {
    models.updateProject(req,res);
});

router.delete('/project', function(req, res) {
    models.updateProject(req,res);
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});



module.exports = router;
