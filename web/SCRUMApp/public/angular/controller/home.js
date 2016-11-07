//angular modules
angular.module('Home',[])
    .controller('HomeController', ['$scope','$location','$http','Projects',  function($scope, $location,$http, Projects){

        $scope.title = "SCRUMApp";
        $scope.github = {
            link : "https://github.com/jleveau/Cdc_SCRUM",
            image : "/public/images/github.png"
        };
        $scope.title = "SCRUMApp - Home";




}]);


