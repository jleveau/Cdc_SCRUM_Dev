//angular modules
var SCRUMApp = angular.module('SCRUMApp');

SCRUMApp.controller('HomeController', ['$scope','$location',  function($scope, $location){
    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "/public/images/github.png"
    };

    $scope.data = {
        "projects" : [{
            'id' : '1',
            'name' : "toto"},
            {'id' : '2',
            'name' : "tata"
        }]
    };

    $scope.projects_search = [];
    $scope.limit = 5; // max 10 project loaded
    $scope.projects_search = $scope.data.projects;

    $scope.setMaster = function (project) {
        $scope.searchText = project.name; // pull selected project using {{selected | json}}
    }

    $scope.go = function ( path ) {
        $location.path( path );
    };

}]);

