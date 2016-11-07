//var Controller = require ('./controllers/tasks');

module.exports = function(app, ctrl) {

	app.get('/api/tasks', ctrl.findAllProjects);

	app.post('/api/task', ctrl.addproject);

	app.get('/api/tasks/:id', ctrl.findById);
	
	app.put('/api/tasks/:id', ctrl.updateTask);

	app.delete('/api/tasks/:id', ctrl.deleteTask);

};
