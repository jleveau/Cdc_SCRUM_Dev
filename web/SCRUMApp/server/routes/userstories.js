//var Controller = require ('./controllers/userstories');

module.exports = function(app, ctrl) {

	app.get('/api/userstories', ctrl.findAllUserstories);

	app.get('/api/userstory/edit/:id',ctrl.findUsById);

	app.post('/api/userstory', ctrl.addUserstory);

	app.get('/api/project/backlog/:id', ctrl.findByIdProject);

	app.get('/api/userstory/:id/tasks', ctrl.findUserstoryTasks);
	
	app.put('/api/userstory/update', ctrl.updateUserstory);

	app.delete('/api/project/:id/backlog/userstory/:id_us', ctrl.deleteUserstory);

};
