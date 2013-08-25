
angular.module('caelum.filters', [])

    .filter('since', function() {

        return function(ts) {
            if (!ts) {
                return '00:00:00'
            }

            var h = Math.floor( ts/(60*60*1000) ) % 24;
            var m = Math.floor( ts/(60*1000) ) % 60;
            var s = Math.floor( ts/(1000) ) % 60;

            if (h < 10) { h = '0' + h; }
            if (m < 10) { m = '0' + m; }
            if (s < 10) { s = '0' + s; }

            return h + ':' + m + ':' + s;
        }
    });
