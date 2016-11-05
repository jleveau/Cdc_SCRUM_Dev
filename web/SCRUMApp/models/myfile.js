var mongoose = require('mongoose');
var user = require('./user');
var scrumdb = require('./scrumdb');
var projects = mongoose.model('projects');
var user_project = mongoose.model('user_project');

mongoose.connect('mongodb://localhost:27017/scrumdb', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }else {
        console.log("Database localhost:27017/scrumdb ");
    }
});

var newProject = new projects({
    //member_list: [{ type :ObjectId, ref: 'users' }],
    name: 'JEE',
    specification: new Buffer('test du buffer'),
    //product_owner: { type :ObjectId, ref: 'users' },
    github: 'http site',
    status: 'public',
    date_start: new Date(),
    description: 'JEE 2',
});

newProject.save(function(err){
 if(err) throw err;

    var userproject = new user_project({
    _idUser : '58176af36e8ece4deb72d90e',
    _idProject : newProject._id
    });

    userproject.save(function(err){
        if(err) throw err;
    });
});


user.getUserProjects('58176af36e8ece4deb72d90e',function(prj){
    for(p of prj){
        user.getProjectsById(p._idProject,function(projects){
            console.log(projects);
        });
    }
});