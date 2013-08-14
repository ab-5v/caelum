/* borschik:include:../bower_components/underscore/underscore.js */
/* borschik:include:../bower_components/backbone/backbone.js */



$.ajax({
    url: '/api/timers/',
    method: 'get',
    complete: function() {
        console.log(arguments);
    }
});


