//var Controller = require ('./controllers/tasks');

module.exports = function(app, ctrl) {

    app.get('/api/project/:project_id/notifications', ctrl.findForProject);

    app.get('/api/notifications/:id', ctrl.findOne);

    app.post('/api/notifications/new', ctrl.addNotification);

    app.put('/api/notifications/:id', ctrl.updateNotification);

    app.delete('/api/notifications/:id', ctrl.deleteNotification);
};
