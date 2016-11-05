//angular modules

angular.module('Project', [])
    .controller('ProjectController', ['$scope', '$routeParams','$location','$http', 'Projects', 'AuthService',
                                            function($scope, $routeParams,$location,$http,Projects, AuthService) {

        $scope.params = $routeParams;
        $scope.new_project = {status: 'public'};

        AuthService.getCurrentUser().then(function(){
            $scope.current_user = AuthService.getUserStatus();
        });
        if ($scope.params.project_id){
            Projects.get($scope.params.project_id).then(function(response){
                $scope.project = response.data;
                Projects.setProject($scope.project);
            });
        }

        $scope.isProductOwner = function(){
            if (!$scope.current_user || !$scope.project) return false;
            console.log($scope.project);
            return $scope.current_user._id == $scope.project.product_owner._id;
        }

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.createProject = function (){
            $scope.new_project.product_owner = $scope.current_user;
            $scope.new_project.member_list = [$scope.current_user];
            Projects.create($scope.new_project).then(function(response){
                $location.path( "/project/" + response._id);
            });
        };

        $scope.updateProductOwner = function(user){
            Projects.setProductOwner(user,function(){
                 Projects.updateProductOwner();
            });
        }

    }]);