//angular modules

SCRUMApp.controller('ProjectController', ['$scope', '$routeParams','$location','$http', function($scope, $routeParams,$location,$http) {
    $scope.params = $routeParams;
  /*  if ( $scope.params.project_id == undefined){
        throw "no project_id given"
    }*/

    $http.get('/api/project/' + $scope.params.project_id, function (req, res) {
        $scope.project = res.data;
    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);