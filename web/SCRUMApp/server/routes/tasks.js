//var Controller = require ('./controllers/tasks');

module.exports = function(app, ctrl) {

	app.get('/api/tasks', ctrl.findAllTasks);

	app.post('/api/task/new', ctrl.addTask);

	app.get('/api/tasks/info/:id', ctrl.findById);
	
	app.put('/api/tasks/:id', ctrl.updateTask);

	app.delete('/api/task/:id_task', ctrl.deleteTask);

};
