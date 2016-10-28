//angular modules
var SCRUMApp = angular.module('SCRUMApp');

SCRUMApp.controller('HomeController', ['$scope','$location',  function($scope, $location){
    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "/public/images/github.png"
    };

    $scope.go = function ( path ) {
        $location.path( path );
    };
}]);

