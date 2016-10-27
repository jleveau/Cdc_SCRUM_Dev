//angular modules
var SCRUMApp = angular.module('SCRUMApp');

SCRUMApp.controller('HomeController', ['$scope', function($scope) {
    $scope.title = "SCRUMApp";
    $scope.github = {
        link : "https://github.com/jleveau/Cdc_SCRUM",
        image : "public/images/github.png"
    };
}]);

