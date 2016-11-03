//var Controller = require ('./controllers/projects');

module.exports = function(app, ctrl) {

	app.get('/api/projects', ctrl.findAllProjects);

	app.post('/api/project', ctrl.addproject);

	app.get('/api/all_projects', ctrl.findAllProjects);

	app.get('/api/project/:id', ctrl.findById);
	
	app.put('/api/project/:id', ctrl.updateProject);
	
	app.delete('/api/project/:id', ctrl.deleteProject);

	app.get('/api/projectsPublic', ctrl.findProjectsPublics);

	//api routes. use it to return json objects
	app.get('/api/reachable_projects', function (req, res) {
		res.send("{projects : [" +
			"{ id : 1," +
			"  name : toto}," +
			"{  id : 2," +
			"  name : tata" +
			"}]}");

	});
};
