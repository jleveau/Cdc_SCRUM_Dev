//var Controller = require ('./controllers/userstories');

module.exports = function(app, ctrl) {

	app.get('/api/userstories', ctrl.findAllUserstories);

	app.post('/api/userstory', ctrl.addUserstory);

	app.get('/api/userstory/:id', ctrl.findById);
	
	app.put('/api/userstory/:id', ctrl.updateUserstory);

	app.delete('/api/userstory/:id', ctrl.deleteUserstory);

};
