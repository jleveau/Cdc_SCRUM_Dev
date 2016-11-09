var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Userstory  = mongoose.model('userstories');
var ObjectId = mongoose.Types.ObjectId;

//GET - Return all userstories in the DB
module.exports.findAllUserstories = function(req, res) {
    Userstory.find(function(err, userstories) {
        if(err) res.send(500, err.message);
        console.log('GET');
        res.status(200).jsonp(userstories);
    });
};

//GET - Return a userstory with specified project_ID
module.exports.findByIdProject = function(req, res) {
    console.log('Cotrl GET/'+req.params.id);

    var data = [
        {
            'id' : 1,
            'desc' : 'IEEE Computer Society',
            'prio' : 4,
            'cost' : 2,
            'sprint' : 'sprint2',
            'state' : 'valid',
            'action' : 'delete'
        }, {
            'id' : 2,
            'desc' : 'National Academy of Engineering',
            'prio' : 1,
            'cost' : 5,
            'sprint' : 'sprint1',
            'state' : 'non-valid',
            'action' : 'delete'
        }
    ];

    Userstory.find({
            'id_project' : req.params.id
        }, function (err, userstories){
            if(err) return res.send(500, err.message);

            return res.status(200).jsonp(data);
        }
    )
};

//POST - Insert a new userstory in the DB
module.exports.addUserstory = function(req, res) {
    console.log('POST');
    var userstory = new Userstory(req.body.userstory);
    userstory.save(function(err, userstory) {
	if(err) return res.send(500, err.message);	
           res.status(200).jsonp(userstory);
    });

};

//PUT - Update a register already exists
module.exports.updateUserstory = function(req, res) {
    Userstory.findById(req.params.id, function(err, userstory) {
	//TODO
        
        userstory.save(function(err) {
        if(err) return res.send(500, err.message);
            res.status(200).jsonp(userstory);
        });
    });
};

//DELETE - Delete a userstory with specified ID
module.exports.deleteUserstory = function(req, res) {
	Userstory.findById(req.params.id, function(err, userstory) {
	    userstory.remove(function(err) {
                if(err) return res.send(500, err.message);
                res.send(200);
	    })
	});
};