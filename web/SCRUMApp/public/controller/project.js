//angular modules
var SCRUMApp = angular.module('SCRUMApp');
<<<<<<< HEAD
=======

>>>>>>> fe7ef4986a174e1371acc98c45c3519ea0000dbd
SCRUMApp.controller('ProjectController', ['$scope', '$routeParams','$location','$http', function($scope, $routeParams,$location,$http) {
    $scope.params = $routeParams;
  /*  if ( $scope.params.project_id == undefined){
        throw "no project_id given"
    }*/
/*
    $http.get('/api/project/' + $scope.params.project_id, function (req, res) {
        $scope.project = res.data;
    });
*/
    $scope.project = $scope.project = {
        'id': 1,
        'name' : "My Awesome Project",
        'description' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat mattis cursus. In vel aliquam ligula. Suspendisse eros odio, facilisis imperdiet tempus sed, cursus sit amet felis. Sed elementum pretium erat et laoreet. Phasellus gravida ante in maximus ornare. Vestibulum lacinia sapien nec turpis interdum rhoncus. Etiam placerat urna sit amet justo molestie, eget ornare mauris sollicitudin. Nunc ac nisl nunc. Morbi",
        'date_start' : new Date(2013, 9, 22),
        'product_owner' : {
            'username' : "toto",
            'image' : '/public/images/github.png'
        },
        'member_list' : [{
            'username' : "toto",
            'image' : '/public/images/github.png'
        },{
            'username' : "tata",
            'image' : '/public/images/github.png'
        }],

    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.update = function (){
        console.log($scope.project);
        $http.put('/api/project/' + $scope.project.id, $scope.project);
    }
}]);