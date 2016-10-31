//var Controller = require ('./controllers/projects');

module.exports = function(app, ctrl) {

	app.get('/projects', ctrl.findAllProjects);

	app.post('/project', ctrl.addproject);

	app.get('/project/:id_project', ctrl.findById);
	
	app.put('/project/:id_project', ctrl.updateProject);
	
	app.delete('/project/:id_project', ctrl.deleteProject);
	
};
