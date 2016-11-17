var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Project  = mongoose.model('projects');
var UserProject = mongoose.model('user_project');
var User = mongoose.model('users');
var Sprint = mongoose.model('sprints');
var ObjectId = mongoose.Types.ObjectId;
var Userstory = mongoose.model('userstories');


//GET - Return all tasks in the DB
module.exports.findSprintPerProject = function(req, res) {
    var project_id = req.params.project_id;
    Sprint.find({
        'project': project_id
    }, function (err, sprints) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(sprints);
    });
};

module.exports.findSprintUserStories = function(req, res){
    var sprint_id = req.params.sprint_id;
    Userstory.find({
        'sprint': sprint_id
    }, function (err, usertories) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(usertories);
    });

};
