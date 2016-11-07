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

//GET - Return a userstory with specified ID
module.exports.findById = function(req, res) {
    Userstory.findById(req.params.id,function(err, userstory) {
         if(err) return res.send(500, err.message);

    	    console.log('GET /userstory/' + req.params.id);
	    res.status(200).jsonp(userstory);
    });
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
            res.status(200).jsonp(project);
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


