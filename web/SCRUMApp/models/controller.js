var user = require('./scrumdb.js');

exports.getUsers = function (req, res){
	Users.find(
		function(err, users) {
			if (err)
				res.send(err)
					res.json(users); // return all users JSON		
				}
			);
}

//get all projects JSON
exports.getProjects = function (req, res){
	Projects.find(
		function(err, projects) {
			if (err)
				res.send(err)
					res.json(projects); 
				}
			);
}

//remove object project
exports.removeProject = function(req, res) {
	Project.remove({_id : req.params.project_id}, function(err, project) {
		if (err)
			res.send(err);

			Projects.find(function(err, projects) {
				if (err)
					res.send(err)
				res.json(projects);
			});
		});
}
