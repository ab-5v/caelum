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

    angular.extend($scope, {

        /**
         * Timeout of redrawing every runned timser
         * @type Number
         */
        updateTimeout: 1000,

        /**
         * Flag, indicating updating process
         * for one of the timers,
         * prevents multiple updates
         * @type Boolean
         */
        updatingState: false,

        /**
         * Creates new timer
         */
        create: function() {
            $http.post(API_TIMERS)
                .success(function(data) {
                    data.value = 0;
                    $scope.setLastState(data);
                    $scope.timers.push(data);
                }).error(httperror);
        },

        /**
         * Updates timer's title
         * @param {String} id
         * @param {String} title new one
         */
        updateTitle: function(id, title) {
            $http.put(API_TIMERS + id, {title: title})
                .error(httperror);
        },

        /**
         * Switches timer state form state `from`
         * to calculated state
         * @example
         * `from`    `to`
         *  zeroed -> runned
         *  paused -> runned
         *  runned -> paused
         * @param {String} id
         * @param {String} from
         */
        switchState: function(id, from) {
            var to = from === 'runned' ?
                'paused' : 'runned';

            if (to === 'runned') {
                $scope.pauseAll();
            }
            $scope.updateState(id, to);
        },

        /**
         * Updates timer state to the `state`
         * @param {String} id
         * @param {String} state
         */
        updateState: function(id, state) {
            var timer = $scope.getTimerById(id);

            $scope.updatingState = true;

            return $http.put(API_TIMERS + id, {state: STATE[state]})
                .success(function(data) {
                    timer.state = data.state
                    $scope.setLastState(timer);
                    $scope.updatingState = false;
                }).error(httperror);
        },

        moveToArchive: function(id, state) {
            var timer = $scope.getTimerById(id);

            if (state == 'runned') {
                return $scope.updateState(id, 'paused')
                    .success(function(data) {
                        timer.state = data.state
                        $scope.moveToArchive(id, timer.state);
                    });
            }

            $scope.updatingState = true;

            return $http.put(API_TIMERS + id, {archive: true})
                .success(function(data) {
                    timer.archive = data.archive
                    $scope.updatingState = false;
                }).error(httperror);
        },

        /**
         * Pauses all runned timers
         */
        pauseAll: function() {
            angular.forEach($scope.timers, function(timer) {
                if (timer.lastState === 'runned') {
                    $scope.updateState(timer._id, 'paused');
                }
            });
        },

        /**
         * Sets timer's `lastState` property
         * form the `timer`'s `state` array
         * @param {Object} timer
         */
        setLastState: function(timer) {
            var last = timer.state[timer.state.length - 1];
            timer.lastState = STATE[ String(last.st) ];
        },

        /**
         * Calculates `timer`'s overall value
         * from the last `zeroed` state
         * @param {Object} timer
         */
        calculateValue: function(timer) {
            var value = 0, start = 0;
            var states = timer.state;
            var last = states[states.length - 1];

            if (last.st === STATE['zeroed']) {
                return 0;
            }

            angular.forEach(states, function(state) {
                switch (state.st) {
                    case STATE['zeroed']: value = 0; break;
                    case STATE['runned']: start = state.ts; break;
                    case STATE['paused']: value += state.ts - start; break;
                }
            });

            if (last.st === STATE['runned']) {
                value += +new Date() - start;
            }

            return value;
        },

        /**
         * Sets `timer`'s overall value
         * from the last `zeroed` state
         * @param {Object} timer
         */
        setValue: function(timer) {
            timer.value = $scope.calculateValue(timer);
        },

        /**
         * Icreases `value` of the all `runned` timers
         * by the `$scope.updateTimeout` ms
         */
        updateValues: function() {
            angular.forEach($scope.timers, function(timer) {
                if (timer.lastState === 'runned') {
                    timer.value += this.updateTimeout;
                }
            }, this);

            $scope.$apply();
        },

        getTimerById: function(id) {
            var found = null;
            angular.forEach($scope.timers, function(timer) {
                if (timer._id == id) {
                    found = timer;
                }
            });
            return found;
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
