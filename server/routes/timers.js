var db = require('../lib/db');

module.exports = {

    read: function(req, res) {
        var query = {
            owner: 'artjock'
        };

        if (req.params._id) {
            query._id = req.params._id;
        }

        db.timers.find(query).toArray(res.endify);
    },
    create: function(req, res) {
        db.timers.insert(req.params, res.endify);
    },
    update: function(req, res) {
        db.timers.update({_id: req.params._id}, req.params, res.end);
    },
    remove: function(req, res) {
        db.timers.remove({_id: req.params._id}, res.end);
    }

};
