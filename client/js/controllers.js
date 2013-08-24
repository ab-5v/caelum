
function TimerCtrl($scope, $http) {

    $http.get('/api/timers/')
        .success(function(data) {
            $scope.timers = data;
        })
        .error(function() {
            console.log(arguments);
        });
}
