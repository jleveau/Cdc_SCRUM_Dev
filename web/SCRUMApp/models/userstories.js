var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Userstory = mongoose.model('userstories');
var UserstoriesTasks = mongoose.model('userstories_tasks');
var Tasks = mongoose.model('tasks');
var ObjectId = mongoose.Types.ObjectId;

//GET - Return all userstories in the DB
module.exports.findAllUserstories = function (req, res) {
    Userstory.find(function (err, userstories) {
        if (err) res.send(500, err.message);
        console.log('GET');
        res.status(200).jsonp(userstories);
    });
};

//GET - Return all tasks for a userstory
module.exports.findUserstoryTasks = function(req, res){
    var userstory_id = req.params.id;
    Userstory.findById(req.params.id, function (err, userstory) {
        if (err) res.send(500, err.message);
        if (!userstory) res.send(400, "no userstory for id " + userstory_id);
        UserstoriesTasks.find({'_idUserstory' : userstory_id},function(err, userstory_tasks){
            var tasks = [];
            for (userstory_task of userstory_tasks){
                Tasks.findById(userstory_task._idTasks, function(err, task){
                    if (err) res.send(500, err.message);
                    if (err) console.log(err.errors);

                    tasks.push(task);
                    if (userstory_tasks.length == tasks.length) {
                        res.send(200, tasks);
                    }
                });
            }
        });
    });
};

//GET - Return a userstory with specified project_ID
module.exports.findByIdProject = function (req, res) {
    console.log('Ctrl GET/' + req.params.id);
    Userstory.find({
            'id_project': req.params.id
        }, function (err, userstories) {
            if (err) return res.send(500, err.message);

            return res.status(200).jsonp(userstories);
        }
    )
};


//POST - Insert a new userstory in the DB
module.exports.addUserstory = function (req, res) {
    console.log('POST');
    Userstory.find({
            'id_project': req.body.idProject
        }, function (err, userstories) {
            if (err) return res.send(500, err.message);

        var taille = userstories.length;
        var USnumber=0;

        if(taille == 0){
            USnumber = 1;
        }else {
            USnumber = userstories[taille - 1]['number_us'] +1;
        }
        var userstory = new Userstory({
            number_us : USnumber,
            id_project : req.body.idProject,
            description: req.body.userstory.description,
            duration: req.body.userstory.duration,
            priority: req.body.userstory.priority,
            testValidation: req.body.userstory.testValidation
        });

        userstory.save(function (err, userstory) {
            if (err) return res.status(500).send(err.message);

            return res.status(200).jsonp(userstory);
        });
        }
    );
};

//PUT - Update a register already exists
module.exports.updateUserstory = function (req, res) {
    Userstory.findById(req.params.id, function (err, userstory) {
        //TODO

        userstory.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(userstory);
        });
    });
};

//DELETE - Delete a userstory with specified ID
module.exports.deleteUserstory = function (req, res) {
    console.log('DELETE US ');
    Userstory.findOne({
        'id_project': req.params.id,
        '_id': req.params.id_us
    }, function (err, userstory) {
        userstory.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.sendStatus(200);
        })
    });
};