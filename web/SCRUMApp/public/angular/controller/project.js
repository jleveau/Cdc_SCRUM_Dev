//angular modules

angular.module('Project', [])
    .controller('ProjectController', ['$scope', '$routeParams','$location','$http', 'Projects', 'AuthService',
                                            function($scope, $routeParams,$location,$http,Projects, AuthService) {

        $scope.params = $routeParams;
        $scope.min_date = Date.now();

        if ($location.path() === "/project/new"){
            $scope.project = {status: 'public'};
            Projects.setProject($scope.project);
        }

        AuthService.getCurrentUser().then(function(){
            $scope.current_user = AuthService.getUserStatus();
        });

        if ($scope.params.project_id){
            Projects.get($scope.params.project_id).then(function(response){
                $scope.project = response.data;
                $scope.project.date_start = new Date($scope.project.date_start);
                Projects.setProject($scope.project);
            });
        }

        $scope.isProductOwner = function(){
            if (!$scope.current_user || !$scope.project) return false;
            return $scope.current_user._id == $scope.project.product_owner._id;
        };

        $scope.isProjectMember = function(){
            if (!$scope.current_user || !$scope.project) return false;
            return $scope.project.member_list.some(function(member){
                return member._id == $scope.current_user._id;
            });
        };

        $scope.isCreate = function() {
            return $location.path() === "/project/new";
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.go_to_edit = function() {
            if ($scope.project)
                $location.path( "/project/edit/" + $scope.project._id);
        };

        $scope.createProject = function (){
            $scope.project.product_owner = $scope.current_user;
            $scope.project.member_list = [$scope.current_user];
            Projects.create($scope.project,$scope.current_user._id).then(function(response){
                $location.path( "/project/" + response._id);
            });
        };

        $scope.deleteProject = function(){
            Projects.delete($scope.project._id).then(function(response){
                $location.path( "/users/" + $scope.current_user._id);
            });
        };

        $scope.updateProject = function(){
            Projects.updateProject().then(function(response){
                $location.path( "/project/" + $scope.project._id);
            });
        };

        $scope.updateProductOwner = function(user){
            Projects.setProductOwner(user,function(){
                 Projects.updateProductOwner();
            });
        }

    }]);