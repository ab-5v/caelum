
module.exports = function(req, res, next) {

    res.endify = function(err, data) {
        if (err) {
            res.send(500, { error: err });
        } else {
            res.json(data);
        }
    }

    res.endifyOne = function(err, data) {
        res.endify(err, data && data[0]);
    }

    next();

};
