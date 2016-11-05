//angular modules
angular.module('User',[])

    .controller('UserController', ['$scope','$routeParams','Projects','$http','AuthService', function($scope,$routeParams,Projects,$http,AuthService) {
        $scope.params = $routeParams;
        //TODO replace with getAllUsers()
        $scope.users = [];
        $scope.users_search = [];

        $http.get('users/allusers').then(function(response){
            $scope.users = response.data;
            $scope.users_search = $scope.users;
        });

        if ($scope.params.user_id){
            $http.get('users/info/' + $scope.params.user_id).then(function(response){
                $scope.user = response.data;
            }).then(function(){
                $http.get('users/userprojects/' + $scope.user._id).then(function(response){
                    $scope.user_project = response.data;
                });
            });
        }

        AuthService.getCurrentUser().then(function(){
            $scope.current_user = AuthService.getUserStatus();
        });


////////// SearchBar
        //TO DO replace with request to get all public projects + logged user project
        $scope.limit = 5; // max 10 project loaded
        $scope.searchUser= '';

        $scope.setUser = function (user_search_result) {
            angular.copy(user_search_result,$scope.searchUser);
        };

        $scope.add_user_to_project = function(){
            var user_add = null;
            if ($scope.searchUser == null)
                return;
            if ($scope.searchUser.hasOwnProperty("_id")){
                user_add = angular.copy($scope.searchUser,user_add );

                Projects.addMember(user_add,function(){
                    Projects.updateMembers();
                });
            }
        };
        ///////// End Searchbar

    }]);