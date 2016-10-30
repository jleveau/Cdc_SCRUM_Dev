//angular modules
var SCRUMApp = angular.module('SCRUMApp');

SCRUMApp.controller('HomeController', ['$scope','$location',  function($scope, $location){
    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "/public/images/github.png"
    };

    $scope.title = "SCRUMApp - Home";

    ////////// SearchBar
    //TO DO replace with request to get all public projects + logged user project
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

    $scope.setProject = function (project) {
        angular.copy(project,$scope.searchProject);
    }

    $scope.go = function ( path ) {
        $location.path( path );
    };
    $scope.go_to_project = function ( ) {
        $location.path( "/project/" + $scope.searchProject.id);
    };
    ///////// End Searchbar

}]);


