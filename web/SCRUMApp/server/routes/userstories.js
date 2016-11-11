//var Controller = require ('./controllers/userstories');

module.exports = function(app, ctrl) {

	app.get('/api/userstories', ctrl.findAllUserstories);

	app.post('/api/userstory', ctrl.addUserstory);

	app.get('/api/project/backlog/:id', ctrl.findByIdProject);
	
	app.put('/api/userstory/:id', ctrl.updateUserstory);

	app.delete('/api/project/:id/backlog/userstory/:id_us', ctrl.deleteUserstory);

};
