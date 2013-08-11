var db = require('../lib/db');

module.exports = {

    read: function(req, res) {
        db.find(req.params, res.end);
    },
    create: function(req, res) {
        db.timers.insert(req.params, res.end);
    },
    update: function(req, res) {
        db.timers.update({_id: req.params._id}, req.params, res.end);
    }
    remove: function(req, res) {
        db.timers.remove({_id: req.params._id}, res.end);
    }

};
