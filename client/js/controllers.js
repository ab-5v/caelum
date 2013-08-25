;(function() {

angular.module('caelum.controllers', [])
    .controller('TimersCtrl', ['$scope', '$http', TimersCtrl])
    .controller('TimerCtrl', ['$scope', '$http', TimerCtrl])


function TimersCtrl($scope, $http) {

    console.log('TimersCtrl', $scope);
    $scope.titleChange = function() {
        console.log('TimersCtrl.titleChange', $scope);
    };

    $http.get('/api/timers/')
        .success(function(data) {
            $scope.timers = data;
        })
        .error(function() {
            console.log(arguments);
        });
}

function TimerCtrl($scope) {
    angular.extend($scope, $scope.$parent.timer);
    console.log('TimerCtrl', $scope);

    $scope.titleChange = function() {
        console.log('TimerCtrl.titleChange', $scope);
    };
}

})();
