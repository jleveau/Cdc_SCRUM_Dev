var mongoose = require('mongoose');
var schema = require("../models/scrumdb");
var Project  = mongoose.model('projects');


//GET - Return all projects in the DB
module.exports.findAllProjects = function(req, res) {
    Project.find(function(err, projects) {
        if(err) res.send(500, err.message);
        console.log('GET /projects')
        res.status(200).jsonp(projects);
    });
};

//GET - Return a Project with specified ID
module.exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
         if(err) return res.send(500, err.message);

    	console.log('GET /project/' + req.params.id);
	    res.status(200).jsonp(project);
    });
};

//POST - Insert a new Project in the DB
module.exports.addproject = function(req, res) {
    console.log('POST');
    console.log(Project);
    var project_squeleton =
    {
        name: 	       "",
        specification: "",
        product_owner: "",
        status : 'public',
        member_list: [],
        github: "",
        date_start: new Date("12/12/12"),
        description: "",
        sprint_duration: ""
    }
    for(var key in req.body) project_squeleton[key]=req.body[key];
    var project = new Project(project_squeleton);
    project.save(function(err, project) {
	if(err) return res.send(500, err.message);
    	return res.status(200).jsonp(project);
    });
};

//PUT - Update a register already exists
module.exports.updateProject = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
	//TODO
    project.save(function(err) {
        if(err) return res.send(500, err.message);
            res.status(200).jsonp(project);
        });
    });
};

//DELETE - Delete a Project with specified ID
module.exports.deleteProject = function(req, res) {
	Project.findById(req.params.id, function(err, project) {
	    project.remove(function(err) {
	    if(err) return res.send(500, err.message);
                res.status(200);
	    })
	});
};


// GET - Return all projects Publics in the DB
module.exports.findProjectsPublics = function(req, res) {
	Project.find({
		'status' : 'public'
		}, function (err, projects){
			if(err) return res.send(500, err.message);
			return res.status(200).jsonp(projects);
		}
)};