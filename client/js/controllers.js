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
                    data.value = 0;
                    $scope.setLastState(data);
                    $scope.timers.push(data);
                }).error(httperror);
        },

        updateTitle: function(id, title) {
            $http.put(API_TIMERS + id, {title: title})
                .error(httperror);
        },

        pauseAll: function() {
            angular.forEach($scope.timers, function(timer) {
                if (timer.lastState === 'runned') {
                    $scope.updateState(timer._id, 'paused');
                }
            });
        },

        switchState: function(id, from) {
            var to = from === 'runned' ?
                'paused' : 'runned';

            if (to === 'runned') {
                $scope.pauseAll();
            }
            $scope.updateState(id, to);
        },

        updateState: function(id, state) {

            $scope.updatingState = true;

            $http.put(API_TIMERS + id, {state: STATE[state]})
                .success(function(data) {

                    angular.forEach($scope.timers, function(timer) {
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
        },

        setValue: function(timer) {
            var now = +new Date();
            var zero = 0;
            var value = 0;
            var start = 0;
            var states = timer.state;
            var last = states[states.length - 1];

            if (last.st === STATE['zeroed']) {
                timer.value = 0;
                return;
            }

            angular.forEach(states, function(state) {
                if (state.st === STATE['zeroed']) {
                    value = 0;
                }
                if (state.st === STATE['runned']) {
                    start = state.ts;
                }
                if (state.st === STATE['paused']) {
                    value += state.ts - start;
                }
            });

            if (last.st === STATE['runned']) {
                value += +new Date() - start;
            }

            timer.value = value;
        },

        updateValues: function() {
            angular.forEach($scope.timers, function(timer) {
                if (timer.lastState === 'runned') {
                    timer.value += 1000;
                }
            });

            $scope.$apply();
        }

    });

    $http.get(API_TIMERS)
        .success(function(data) {
            $scope.loaded = true;
            $scope.timers = data;

            angular.forEach(data, function(timer) {
                $scope.setValue(timer);
                $scope.setLastState(timer);
            });

        }).error(httperror);

    setInterval(function() {
        $scope.updateValues();
    }, 1000);
}

function httperror() {
    console.log(arguments);
};

})();
