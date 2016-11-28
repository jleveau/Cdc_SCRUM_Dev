var mongoose = require('mongoose');
var schema = require("./scrumdb");
var Notification = mongoose.model('notifications');

var ObjectId = mongoose.Types.ObjectId;


module.exports.findOne = function (req, res) {
    Notification.findById(req.body.notification._id)
        .populate('author')
        .exec(function(err,notification){
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(notification);
    });
};

module.exports.findForProject = function (req, res) {
    var project_id = req.params.project_id;
    Notification.find({
        'project': project_id,
    }).populate('author')
      .exec(function(err, notifications) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(notifications);
    });
};

module.exports.addNotification = function (req, res) {
    var new_notification = new Notification(req.body.notification);
    new_notification.save(function (err, notification) {

        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(notification);
    });
};


module.exports.updateNotification = function (req, res) {
    Notification.findById(req.body.notification._id, function(err,notification){
        notification.body = req.body.body;
        notification.date_updated =  new Date();

        notification.save(function (err, notification) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(notification);
        });
    });
};

module.exports.deleteNotification = function (req, res) {
    Notification.findById(req.body.notification._id, function(err,notification){
        notification.remove(function(err){
            if (err) return res.status(500).send(err.message);
            res.send(200);
        });
    });
};


