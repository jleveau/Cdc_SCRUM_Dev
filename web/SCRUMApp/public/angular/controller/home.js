//angular modules
angular.module('Home',[])
    .controller('HomeController', ['$scope','$location','$http',  function($scope, $location,$http){

    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "/public/images/github.png"
    };

    $scope.title = "SCRUMApp - Home";

    $http.get('/api/all_projects', function (req, res) {
        console.log("res");
        $scope.projects = res.data.projects;
    }, function errorCallback(response) {
        console.log("response");
    });

    ////////// SearchBar
    //TO DO replace with request to get all public projects + logged user project
    $scope.projects_search = [];
    $scope.limit = 5; // max 10 project loaded
    $scope.projects_search = $scope.projects;
    $scope.searchProject = '';

    $scope.setProject = function (project) {
        angular.copy(project,$scope.searchProject);
    };

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.go_to_project = function ( ) {
        $location.path( "/project/" + $scope.searchProject.id);
    };
    ///////// End Searchbar
}]);


