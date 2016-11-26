//var Controller = require ('./controllers/userstories');

module.exports = function(app, ctrl) {

	app.get('/api/userstories', ctrl.findAllUserstories);

	app.get('/api/userstory/edit/:id',ctrl.findUsById);

	app.post('/api/userstory', ctrl.addUserstory);

	app.get('/api/project/backlog/:id', ctrl.findByIdProject);

	app.get('/api/userstory/:id/tasks', ctrl.findUserstoryTasks);
	
	app.put('/api/userstory/update', ctrl.updateUserstory);

	app.put('/api/userstory/:id/cost/:cost', ctrl.updateCostUS);

	app.put('/api/userstory/:id/priority/:priority', ctrl.updatePriorityUS);
    
    app.put('/api/userstory/:id/commit_validation/:commit', ctrl.updateValidationUS);

	app.delete('/api/userstory/:id_us', ctrl.deleteUserstory);

};
