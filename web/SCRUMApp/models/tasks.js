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
        .populate('sprint')
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
         .populate('sprint')
         .exec(function(err, task) {
         if(err) return res.send(500, err.message);

          console.log('GET /task/' + req.params.id);
          res.status(200).jsonp(task);
    });
};

//POST - Insert a new task in the DB
module.exports.addTask = function(req, res) {
    Task.find({
        'id_project': req.body.id_project
    }, function (err, tasks) {

        var num_task = 1;
        if (tasks.length != 0){
            for (task of tasks){
                if (task.number_task > num_task){
                    num_task = task.number_task;
                }
            }
            num_task = num_task +1;
        }
        req.body.number_task = num_task;
        var my_task = new Task(req.body);
        my_task.save(function (err, task) {
            if (err) return res.send(500, err.message);

            for (us of task.list_us) {
                var us_task = new US_Task({
                    _idTasks: task._id,
                    _idUserstory: us
                });
                us_task.save(function (err, us_task) {
                });
            }
            res.status(200).jsonp(task);
        });
    });
};


//PUT - Update a register already exists
module.exports.updateTask = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        task.title = req.body.title;
	    task.description = req.body.description;
        task.id_project = req.body.id_project;
        task.date_start = req.body.date_start;
        task.date_end = req.body.date_end;
        task.estimated_code = req.body.estimated_code;
        task.estimated_duration = req.body.estimated_duration;
        task.responsable = req.body.responsable;
        task.state = req.body.state;
        task.list_us = req.body.list_us;
        task.list_tasks_depend = req.body.list_tasks_depend;
        task.updated = Date.now;
        task.sprint = req.body.sprint;
        task.save(function(err, task) {
        if(err) return res.send(500, err.message);
            US_Task.remove({_idTasks : task._id}, function(err){
                for (us of task.list_us){
                    var us_task = new US_Task({
                        _idTasks : task._id,
                        _idUserstory : us
                    });
                    us_task.save(function(err, us_task){
                        if (err) console.log(err.errors);
                    });
                }
            });
            res.status(200).jsonp(task);
        });
    });
};

//DELETE - Delete a task with specified ID
module.exports.deleteTask = function(req, res) {
    US_Task.remove({_idTasks : req.params.id_task}, function(err){
        if (err) return res.send(500, err.message);

        Task.findById(req.params.id_task, function(err, task) {
            task.remove(function(err) {
                if(err) return res.send(500, err.message);
                res.sendStatus(200);
            })
        });
    });
};

module.exports.getTaskForSprint = function(req,res){
    Task.find({ 'sprint': req.params.sprint_id})
        .populate('list_us')
        .populate('responsable')
        .populate('sprint')
        .exec(function(err, tasks) {
            if(err) res.send(500, err.message);
            res.send(200, tasks);
        });
};