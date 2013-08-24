
angular.module('caelum.filters', [])

    .filter('since', function() {

        return function(ts) {
            var now = +new Date();

            if (!ts || ts > now) {
                return '00:00'
            }

            var h = Math.floor( (now - ts)/(60*60*1000) );
            var m = Math.floor( (now - ts)/(60*1000) );

            if (h < 10) { h = '0' + h; }
            if (m < 10) { m = '0' + m; }

            return h + ':' + m;
        }
    });
