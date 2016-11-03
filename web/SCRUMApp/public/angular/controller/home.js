//angular modules
angular.module('Home',[])
    .controller('HomeController', ['$scope','$location','$http','Projects',  function($scope, $location,$http, Projects){

    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "/public/images/github.png"
    };
    $scope.title = "SCRUMApp - Home";

    var request = Projects.getAll().then(function(response){
        $scope.projects = response;
        $scope.projects_search = $scope.projects;
        }, function(response){
        $scope.data = response.status;
            $scope.projects_search = $scope.projects;
        }
    );

    ////////// SearchBar
    //TO DO replace with request to get all public projects + logged user project
    $scope.limit = 5; // max 10 project loaded
    $scope.searchProject = '';

    $scope.setProject = function (project) {
        angular.copy(project,$scope.searchProject);
    };

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.go_to_project = function ( ) {
        $location.path( "/project/" + $scope.searchProject._id);
    };
    ///////// End Searchbar
}]);


