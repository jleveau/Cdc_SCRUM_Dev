//angular modules
angular.module('User',[])

    .controller('UserController', ['$scope','$routeParams','Projects', function($scope,$routeParams,Projects) {
        $scope.params = $routeParams;
        //TODO replace with getAllUsers()
        $scope.users = [{id:1,username : "toto"}, {id:2,username: "tata"}, {id:3,username: "bertrand"}];

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
        }

////////// SearchBar
        //TO DO replace with request to get all public projects + logged user project
        $scope.limit = 5; // max 10 project loaded
        $scope.users_search = $scope.users;
        $scope.searchUser= '';

        $scope.setUser = function (user_search_result) {
            angular.copy(user_search_result,$scope.searchUser);
        };

        $scope.add_user_to_project = function(project){
            
            if ($scope.searchUser.hasOwnProperty("id")){
                var user_add = angular.copy($scope.searchUser,user_add );
                Projects.addMember(user_add,function(){
                    Projects.updateProject();
                });
            }
        }
        ///////// End Searchbar

    }]);