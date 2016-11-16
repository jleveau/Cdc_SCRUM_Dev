
module.exports = function(app, ctrl) {

    app.get('/api/project/:project_id/sprint/', ctrl.findSprintPerProject);

    app.get('/api/sprint/:sprint_id/userstories', ctrl.findSprintUserStories);

};