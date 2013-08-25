;(function() {

var API_TIMERS = '/api/timers/';

var STATE = {
    '1': 'runned',
    '2': 'paused',
    '3': 'zeroed',
    'runned': 1,
    'paused': 2,
    'zeroed': 3
};

angular.module('caelum.controllers', [])
    .controller('TimersCtrl', ['$scope', '$http', TimersCtrl]);

function TimersCtrl($scope, $http) {

    console.log('TimersCtrl', $scope);
    $scope.titleChange = function() {
        console.log('TimersCtrl.titleChange', $scope);
    };

    angular.extend($scope, {

        updatingState: false,

        create: function() {
            $http.post(API_TIMERS)
                .success(function(data) {
                    $scope.setLastState(data);
                    $scope.timers.push(data);
                }).error(httperror);
        },

        updateTitle: function(id, title) {
            $http.put(API_TIMERS + id, {title: title})
                .success(function() {
                    console.log(arguments);
                }).error(httperror);
        },

        updateState: function(id, from) {
            var state = from === 'runned' ? 'paused' : 'runned';

            $scope.updatingState = true;

            $http.put(API_TIMERS + id, {state: STATE[state]})
                .success(function(data) {

                    $scope.timers.forEach(function(timer) {
                        if (timer._id === id) {
                            timer.state = data.state
                            $scope.setLastState(timer);
                        }
                    });

                    $scope.updatingState = false;

                }).error(httperror);
        },

        setLastState: function(timer) {
            var last = timer.state[timer.state.length - 1];
            timer.lastState = STATE[ String(last.st) ];
        }

    });

    $http.get(API_TIMERS)
        .success(function(data) {
            $scope.loaded = true;
            $scope.timers = data;

            data.forEach($scope.setLastState);

        }).error(httperror);
}

function httperror() {
    console.log(arguments);
};

})();
