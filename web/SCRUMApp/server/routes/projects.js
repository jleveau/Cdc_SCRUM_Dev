//var Controller = require ('./controllers/projects');

module.exports = function(app, ctrl) {

	app.get('/api/projects', ctrl.findAllProjects);

	app.post('/api/project', ctrl.addproject);

	app.get('/api/project/:id_project', ctrl.findById);
	
	app.put('/api/project/:id_project', ctrl.updateProject);
	
	app.delete('/api/project/:id_project', ctrl.deleteProject);
};
