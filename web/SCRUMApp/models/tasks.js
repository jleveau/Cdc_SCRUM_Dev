var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Task  = mongoose.model('tasks');
var ObjectId = mongoose.Types.ObjectId;


//GET - Return all tasks in the DB
module.exports.findAllTasks = function(req, res) {
    Task.find(function(err, tasks) {
        if(err) res.send(500, err.message);
        console.log('GET');
        res.status(200).jsonp(tasks);
    });
};

//GET - Return a Task with specified ID
module.exports.findById = function(req, res) {
    Task.findById(req.params.id,function(err, task) {
         if(err) return res.send(500, err.message);

    	    console.log('GET /task/' + req.params.id);
	    res.status(200).jsonp(task);
    });
};

//POST - Insert a new task in the DB
module.exports.addTask = function(req, res) {
    console.log('POST');
    var task = new Task(req.body.task);

    task.save(function(err, task) {
	if(err) return res.send(500, err.message);	
           res.status(200).jsonp(task);
        
    });

};


//PUT - Update a register already exists
module.exports.updateTask = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
	//TODO
        
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

