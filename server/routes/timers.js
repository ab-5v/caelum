var db = require('../lib/db');

module.exports = {

    read: function(req, res) {
        var query = {
            user: req.user._id
        };

        if (req.params._id) {
            query._id = db.id(req.params._id);
        }

        db.timers.find(query).toArray(res.endify);
    },

    create: function(req, res) {
        var doc = {
            user: req.user._id,
            name: req.body.name || ''
        };

        db.timers.insert(doc, res.endifyOne);
    },

    update: function(req, res) {
        var query = { _id: db.id(req.params._id) };
        var options = {new: true};
        var updates = {};

        if ('name' in req.body) {
            updates.name = req.body.name;
        }

        db.timers.findAndModify(query, [], {$set: updates}, options, res.endify);
    },

    remove: function(req, res) {
        var query = { _id: db.id(req.params._id) };

        db.timers.findAndRemove(query, [], res.endify);
    }

};
