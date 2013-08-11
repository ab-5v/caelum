var pzero = require('pzero');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var cfg = {
    host: 'localhost',
    port: 27017,
    name: 'tq6',
    collections: ['timers', 'users']
};

exports = {
    id: function(hex) {
        return new ObjectID.createFromHexString(hex);
    },
    close: function() {
        exports._db.close();
    },
    isReady: pzero()
};

mongo.connect('mongodb://' + cfg.host + ':' + cfg.port + '/' + cfg.name, function(err, db) {

    var wait, collections;

    if (err) {
        return exports.isReady.reject(err);
    }

    exports._db = db;

    collections = cfg.collections.map(function(name) {
        var collection = pzero();

        db.collection(name, collection.node());

        return collection;
    });

    pzero
        .when(collections)
        .then(function(collections) {

            collections.map(function(collection) {
                exports[ collection.collectionName ] = collection;
            });
        })
        .pipe(exports.isReady);

});

module.exports = exports;

