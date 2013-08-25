var db = require('../lib/db');

const RUNNIG = 1;
const PAUSED = 2;
const ZEROED = 3;

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
            title: req.body.name || '',
            state: [
                { ts: +new Date(), st: ZEROED }
            ]
        };

        db.timers.insert(doc, res.endifyOne);
    },

    update: function(req, res) {
        var param = req.body;
        var query = { _id: db.id(req.params._id) };
        var state = param.state;
        var options = {new: true};
        var updates = {};

        if ('title' in req.body) {
            updates['$set'] = { title: params.title };
        }

        if (state == RUNNIG || state == PAUSED || state == ZEROED) {
            updates['$push'] = {
                state: { ts: +new Date(), st: state }
            };
        }

        db.timers.findAndModify(query, [], updates, options, res.endify);
    },

    remove: function(req, res) {
        var query = { _id: db.id(req.params._id) };

        db.timers.findAndRemove(query, [], res.endify);
    }

};
