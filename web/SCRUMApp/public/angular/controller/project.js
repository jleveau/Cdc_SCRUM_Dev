//angular modules

angular.module('Project',[])
angular.module('Project', [])
    .controller('ProjectController', ['$scope', '$routeParams','$location','$http', 'Projects',
                                            function($scope, $routeParams,$location,$http,Projects) {

        $scope.params = $routeParams;
        $scope.new_project = {status: 'public'};

        // TODO getCurrent_User($scope.params.id)
        $scope.user = {
            username: "username"
        };

        if ($scope.params.project_id){
            Projects.get($scope.params.project_id).then(function(response){
                $scope.project = response.data;
                Projects.setProject($scope.project);
            });
        }


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.createProject = function (){
            Projects.create($scope.new_project).then(function(response){
                $location.path( "/project/" + response._id);
            });
        };

    }]);