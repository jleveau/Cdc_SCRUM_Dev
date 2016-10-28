//angular modules
var SCRUMApp = angular.module('SCRUMApp');

SCRUMApp.controller('ProjectController', ['$scope', '$routeParams','$location', function($scope, $routeParams,$location) {
    $scope.params = $routeParams;
  /*  if ( $scope.params.project_id == undefined){
        throw "no project_id given"
    }*/
/*
    app.get('/api/project/' + $scope.params.project_id, function (req, res) {
        $scope.project = res.data;
    });
*/
    $scope.project = {
        'id' : '1',
        'name' : "toto"
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);