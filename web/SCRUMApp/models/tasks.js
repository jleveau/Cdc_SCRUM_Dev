var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Task  = mongoose.model('tasks');
var ObjectId = mongoose.Types.ObjectId;
var US_Task = mongoose.model('userstories_tasks');


//GET - Return all tasks in the DB
module.exports.findAllTasks = function(req, res) {
    Task.find()
        .populate('responsable')
        .populate('list_us')
        .exec(function(err, tasks) {
            if(err) res.send(500, err.message);

            console.log('GET');
            res.status(200).jsonp(tasks);
    });
};

//GET - Return a Task with specified ID
module.exports.findById = function(req, res) {
     Task.findById(req.params.id)
         .populate('responsable')
         .populate('list_us')
         .exec(function(err, task) {
         if(err) return res.send(500, err.message);

          console.log('GET /task/' + req.params.id);
          res.status(200).jsonp(task);
    });
};

//POST - Insert a new task in the DB
module.exports.addTask = function(req, res) {
    var my_task = new Task(req.body);
    my_task.save(function(err, task) {
        if (err) console.log(err.errors);
        if(err) return res.send(500, err.message);

        var related_usertories = task.list_us;
        for (us of related_usertories){
            var us_task = new US_Task({
                _idTasks : task._id,
                _idUserstory : ObjectId(us._id)
            });
            us_task.save(function(err, us_task){
                if (err) console.log(err.errors);
            });
        }
       res.status(200).jsonp(task);
    });
};


//PUT - Update a register already exists
module.exports.updateTask = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
	    task.description = req.body.description;
        task.id_project = req.body.id_project;
        task.date_start = req.body.date_start;
        task.date_end = req.body.date_end;
        task.estimated_code = req.body.estimated_code;
        task.estimated_duration = req.body.estimated_duration;
        task.responsable = req.body.responsable;
        task.state = req.body.state;
        task.list_us = req.body.list_us;
        task.updated = Date.now;

        task.save(function(err) {
        if(err) return res.send(500, err.message);
            res.status(200).jsonp(task);
        });
    });
};

//DELETE - Delete a task with specified ID
module.exports.deleteTask = function(req, res) {
	Task.findById(req.params.id, function(err, task) {
	    task.remove(function(err) {
                if(err) return res.send(500, err.message);
                res.send(200);
	    })
	});
};