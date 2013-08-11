
module.exports = function(req, res, next) {

    res.endify = function(err, data) {
        if (err) {
            res.send(500, { error: err });
        } else {
            res.json(data);
        }
    }

    next();

};
