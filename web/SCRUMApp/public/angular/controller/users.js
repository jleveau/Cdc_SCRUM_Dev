//angular modules
angular.module('User',[])

    .controller('UserController', ['$scope','$routeParams','Projects','$http', function($scope,$routeParams,Projects,$http) {
        $scope.params = $routeParams;
        //TODO replace with getAllUsers()
        $scope.users = [];
        $scope.users_search = [];

        $http.get('users/allusers').then(function(response){
            $scope.users = response.data;
            $scope.users_search = $scope.users;

        });

        // TODO Replace with getCurrent_User($scope.params.id)
        $scope.user = {
            username: "username",
            mail: "email",
            password: "password",
            image: null,
            first_name: null,
            last_name: null,
             followed_projects: [{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' }],
            date_created: new Date(),
            date_updated: new Date()
        };

////////// SearchBar
        //TO DO replace with request to get all public projects + logged user project
        $scope.limit = 5; // max 10 project loaded
        $scope.searchUser= '';

        $scope.setUser = function (user_search_result) {
            angular.copy(user_search_result,$scope.searchUser);
        };

        $scope.add_user_to_project = function(){
            var user_add = null;
            console.log($scope.searchUser)
            if ($scope.searchUser.hasOwnProperty("_id")){
                user_add = angular.copy($scope.searchUser,user_add );
                Projects.addMember(user_add,function(){
                    Projects.updateProject();
                });
            }
        };
        ///////// End Searchbar

    }]);