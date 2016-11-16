var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Project  = mongoose.model('projects');
var UserProject = mongoose.model('user_project');
var User = mongoose.model('users');
var Sprint = mongoose.model('sprints');
var ObjectId = mongoose.Types.ObjectId;


//GET - Return all tasks in the DB
module.exports.findSprintPerProject = function(req, res) {
    var project_id = req.params.project_id;
    Sprint.find({
        'id_project': req.body.id_project
    }, function (err, sprints) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(sprints);
    });
};
