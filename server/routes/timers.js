var db = require('../lib/db');

module.exports = {

    read: function(req, res) {
        var query = {
            owner: 'artjock'
        };

        if (req.params._id) {
            query._id = req.params._id;
        }

        db.timers.find(query).toArray(function(err, data) {
            if (err) {
                res.end(err);
            } else {
                res.json(data);
            }
        });
    },
    create: function(req, res) {
        db.timers.insert(req.params, res.end);
    },
    update: function(req, res) {
        db.timers.update({_id: req.params._id}, req.params, res.end);
    },
    remove: function(req, res) {
        db.timers.remove({_id: req.params._id}, res.end);
    }

};
