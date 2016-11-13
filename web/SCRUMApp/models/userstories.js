var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Userstory = mongoose.model('userstories');
var ObjectId = mongoose.Types.ObjectId;

//GET - Return all userstories in the DB
module.exports.findAllUserstories = function (req, res) {
    Userstory.find(function (err, userstories) {
        if (err) res.send(500, err.message);
        console.log('GET');
        res.status(200).jsonp(userstories);
    });
};

//GET - Return a userstory with specified project_ID
module.exports.findByIdProject = function (req, res) {
    console.log('Ctrl GET/' + req.params.id);

    var data = [
        {
            '_id': 1,
            'number_us': 1,
            'description': 'IEEE Computer Society',
            'priority': 4,
            'estimated_cost': 2,
            'sprint': 1,
            'state': 'Valid'
        }, {
            '_id': 2,
            'number_us': 2,
            'description': 'National Academy of Engineering',
            'priority': 1,
            'estimated_cost': 5,
            'sprint': 2,
            'state': 'Not Valid'
        }
    ];

    Userstory.find({
            'id_project': req.params.id
        }, function (err, userstories) {
            if (err) return res.send(500, err.message);

            return res.status(200).jsonp(userstories);
        }
    );
};


//POST - Insert a new userstory in the DB
module.exports.addUserstory = function (req, res) {
    Userstory.find({
            'id_project': req.body.idProject
        }, function (err, userstories) {
            if (err) return res.send(500, err.message);

        var taille = userstories.length;
        var USnumber = 0;

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
    Userstory.findOne({
        'id_project': req.params.id,
        '_id': req.params.id_us
    }, function (err, userstory) {
        userstory.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.send(200);
        });
    });
};