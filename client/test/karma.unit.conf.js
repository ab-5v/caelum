var common = require('./karma.conf.js');

module.exports = function(config) {
    common(config);


    config.files = config.files.concat([
        //extra testing code
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/date-ms/index.js',

        //test files
        'test/unit/**/*.js'
    ]);

};
