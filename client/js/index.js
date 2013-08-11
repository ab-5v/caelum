/* borschik:include:../bower_components/underscore/underscore.js */
/* borschik:include:../bower_components/backbone/backbone.js */



$.ajax({
    url: '/api/timers/520803b007cb9d9a5e000001',
    method: 'delete',
    data: {
        name: 'Stalin'
    },
    complete: function() {
        console.log(arguments);
    }
})
